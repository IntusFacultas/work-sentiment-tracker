'use client';
import {
  ChangeEvent,
  FunctionComponent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { NavigationMenu } from './WorkdayTracker/components/NavigationMenu';
import { UserAuthentication } from './authentication/UserAuthentication';
import { Dialog, Toast } from 'radix-ui';
import { Cross2Icon } from '@radix-ui/react-icons';
import dialogStyles from './Dialog.module.css';
import toastStyles from './Toast.module.css';
import { Session } from 'next-auth';
import { User } from '@prisma/client';
import { Button } from './foundation/Button';
import { UserAvatar } from './authentication/UserAvatar';
import CustomLink from './foundation/CustomLink';

type HeaderProps = {
  onSignIn: () => Promise<void>;
  onSignOut: () => Promise<void>;
  onAddBuddy: (buddy: User) => Promise<boolean>;
  onSearchForBuddy: (buddyCode: string) => Promise<User | null>;
  session: Session | null;
  onRemoveBuddy: (buddyID: string) => Promise<boolean>;
  loadInvitedBuddies: () => Promise<Pick<User, 'id' | 'name' | 'image'>[]>;
};
export const Header: FunctionComponent<HeaderProps> = ({
  onSignIn,
  onSignOut,
  onSearchForBuddy,
  onAddBuddy,
  session,
  onRemoveBuddy,
  loadInvitedBuddies,
}) => {
  const [isAddingBuddy, setIsAddingBuddy] = useState(false);
  const [isRemovingBuddy, setIsRemovingBuddy] = useState(false);
  const [invitedBuddies, setInvitedBuddies] = useState<
    Pick<User, 'id' | 'name' | 'image'>[]
  >([]);
  const [searchedBuddy, setSearchedBuddy] = useState<User | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const delayID = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const loadData = async () => {
      const buddies = await loadInvitedBuddies();
      setInvitedBuddies(buddies);
    };
    void loadData();
  }, [loadInvitedBuddies]);

  const onSearch = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      if (delayID.current) {
        clearTimeout(delayID.current);
      }

      const buddyCode = event.target.value;
      delayID.current = setTimeout(() => {
        void onSearchForBuddy(buddyCode).then(buddy => {
          setSearchedBuddy(buddy);
        });
      }, 200);
    },
    [setSearchedBuddy, onSearchForBuddy],
  );

  const onCopyBuddyCode = useCallback(() => {
    if (session?.buddyCode) {
      void navigator.clipboard.writeText(session.buddyCode);
      setToastMessage('Buddy code copied');
    }
  }, [session]);

  const onBuddyAddSubmit = useCallback(async () => {
    const success = await onAddBuddy(searchedBuddy!);
    if (success) {
      setToastMessage('Buddy added');
    } else {
      setToastMessage('Failed to add buddy');
    }
  }, [searchedBuddy, onAddBuddy]);

  const onBuddyRemove = useCallback(
    async (buddyID: string) => {
      const success = await onRemoveBuddy(buddyID);
      if (success) {
        setToastMessage('Buddy removed');
      } else {
        setToastMessage('Failed to remove buddy');
      }
      const buddies = await loadInvitedBuddies();
      setInvitedBuddies(buddies);
    },
    [onRemoveBuddy, loadInvitedBuddies],
  );

  return (
    <Toast.Provider>
      <header className="sticky flex justify-center border-b">
        <div className="mx-auto flex h-16 w-full max-w-3xl items-center justify-between px-4 sm:px-6">
          <NavigationMenu />
          <UserAuthentication
            session={session}
            onSignIn={onSignIn}
            onSignOut={onSignOut}
            onRemoveBuddy={() => setIsRemovingBuddy(true)}
            onCopyBuddyCode={onCopyBuddyCode}
            onAddBuddy={() => setIsAddingBuddy(true)}
          />
        </div>
      </header>
      <Dialog.Root open={isRemovingBuddy} onOpenChange={setIsRemovingBuddy}>
        <Dialog.Portal>
          <Dialog.Overlay className={dialogStyles.DialogOverlay} />
          <Dialog.Content className={dialogStyles.DialogContent}>
            <Dialog.Title className={dialogStyles.DialogTitle}>
              Manage Buddies
            </Dialog.Title>
            <Dialog.Description className={dialogStyles.DialogDescription}>
              A buddy is someone who can view your work sentiment history.
            </Dialog.Description>
            {invitedBuddies.map(buddy => (
              <div className="flex justify-between items-center" key={buddy.id}>
                <div className="flex items-center gap-2">
                  <UserAvatar user={buddy} />
                  <p>{buddy?.name}</p>
                </div>
                <div className="flex items-center gap-3">
                  <CustomLink href={`/view/${buddy.id}`}>View</CustomLink>
                  <Button
                    variant="destructive"
                    onClick={() => {
                      void onBuddyRemove(buddy.id);
                    }}
                  >
                    <Cross2Icon />
                  </Button>
                </div>
              </div>
            ))}
            <Dialog.Close asChild>
              <button className={dialogStyles.IconButton} aria-label="Close">
                <Cross2Icon />
              </button>
            </Dialog.Close>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
      <Dialog.Root
        open={isAddingBuddy}
        onOpenChange={() => {
          setIsAddingBuddy(false);
          setSearchedBuddy(null);
        }}
      >
        <Dialog.Portal>
          <Dialog.Overlay className={dialogStyles.DialogOverlay} />
          <Dialog.Content className={dialogStyles.DialogContent}>
            <Dialog.Title className={dialogStyles.DialogTitle}>
              Add a buddy
            </Dialog.Title>
            <Dialog.Description className={dialogStyles.DialogDescription}>
              A buddy is someone who can view your work sentiment history.
            </Dialog.Description>
            <fieldset className={dialogStyles.Fieldset}>
              <label className={dialogStyles.Label} htmlFor="buddyCode">
                Buddy Code
              </label>
              <input
                onChange={onSearch}
                className={dialogStyles.Input}
                name="buddyCode"
                id="buddyCode"
              />
            </fieldset>
            {searchedBuddy && (
              <div className="flex items-center gap-2">
                <UserAvatar user={searchedBuddy} />
                <p>{searchedBuddy.name}</p>
              </div>
            )}
            <div className="flex justify-end mt-6">
              <Dialog.Close asChild>
                <Button
                  onClick={() => {
                    void onBuddyAddSubmit();
                  }}
                  variant="default"
                  disabled={!searchedBuddy}
                >
                  Submit
                </Button>
              </Dialog.Close>
            </div>
            <Dialog.Close asChild>
              <button className={dialogStyles.IconButton} aria-label="Close">
                <Cross2Icon />
              </button>
            </Dialog.Close>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
      <Toast.Root
        className={toastStyles.ToastRoot}
        open={!!toastMessage}
        onOpenChange={() => setToastMessage(null)}
      >
        <Toast.Title className={toastStyles.ToastTitle}>
          {toastMessage}
        </Toast.Title>
        <Toast.Close>
          <Cross2Icon />
        </Toast.Close>
      </Toast.Root>
      <Toast.Viewport className={toastStyles.ToastViewport} />
    </Toast.Provider>
  );
};
