import { observer } from "mobx-react-lite";
import { useStores } from "../../store/useStore";
import { ConfirmModal } from "../tests/ConfirmModal";
import { ChangeModalPass } from "../student/changeModalPass";

export const ModalHost = observer(() => {
  const { modalStore } = useStores();

  return (
    <>
      <ConfirmModal
        open={modalStore.isConfirmOpen}
        title={modalStore.confirm?.title ?? ""}
        confirmLabel={modalStore.confirm?.confirmLabel ?? "Подтвердить"}
        cancelLabel={modalStore.confirm?.cancelLabel ?? "Отмена"}
        onConfirm={() => {
          modalStore.confirm?.onConfirm();
          modalStore.close();
        }}
        onClose={modalStore.close}
      />

      <ChangeModalPass
        open={modalStore.isChangePasswordOpen}
        onClose={modalStore.close}
        onSuccess={modalStore.close}
      />
    </>
  );
});
