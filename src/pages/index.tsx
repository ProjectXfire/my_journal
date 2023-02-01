// Components
import {
  DeleteDialog,
  Layout,
  Loading,
  SavingAction,
  SnackbarMessage,
} from "@/modules/shared/components";
import {
  FloatingButton,
  JournalLayout,
  NoSelected,
  Note,
} from "@/modules/journal/components";
// Custom hooks
import { useJournal } from "@/modules/journal/hooks";

export default function Home() {
  //--> Hooks

  const {
    status,
    active,
    openDeleteDialog,
    endTransactionMessage,
    isSaving,
    savingMessage,
    removingNote,
    hideEndTransactionMessage,
  } = useJournal();

  //--> Renders

  if (status === "checking" || status === "not-authenticated")
    return <Loading message="My Journal" />;

  return (
    <Layout title="Journal" name="journal" content="journal">
      <JournalLayout>{active ? <Note /> : <NoSelected />}</JournalLayout>
      <FloatingButton />
      <SavingAction message={savingMessage} isOpen={isSaving} />
      <DeleteDialog
        isOpen={openDeleteDialog}
        title={active?.title}
        onClose={(action) => removingNote(action)}
      />
      <SnackbarMessage
        isOpen={!!endTransactionMessage}
        message={endTransactionMessage?.message!}
        onClose={hideEndTransactionMessage}
      />
    </Layout>
  );
}
