import { useTranslation } from 'react-i18next'
import Modal from './Modal'
import { dangerButtonClass, secondaryButtonClass } from './formStyles'

type ConfirmDialogProps = {
  open: boolean
  title: string
  message: string
  confirmLabel: string
  onConfirm: () => void
  onCancel: () => void
}

export default function ConfirmDialog({
  open,
  title,
  message,
  confirmLabel,
  onConfirm,
  onCancel,
}: ConfirmDialogProps) {
  const { t } = useTranslation()

  return (
    <Modal open={open} title={title} closeLabel={t('common.close')} onClose={onCancel}>
      <p className="text-sm text-slate-400">{message}</p>
      <div className="mt-6 flex justify-end gap-3">
        <button type="button" onClick={onCancel} className={secondaryButtonClass}>
          {t('confirm.cancel')}
        </button>
        <button type="button" onClick={onConfirm} className={dangerButtonClass}>
          {confirmLabel}
        </button>
      </div>
    </Modal>
  )
}
