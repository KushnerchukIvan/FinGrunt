import { useTranslation } from 'react-i18next'
import ConfirmDialog from './ui/ConfirmDialog'
import Modal from './ui/Modal'
import TransactionForm from './TransactionForm'
import {
  useCreateTransaction,
  useDeleteTransaction,
  useUpdateTransaction,
} from '../features/transactions/hooks'
import { useMoney } from '../hooks'
import type { TransactionFormValues } from '../schemas/transactionSchema'
import type { Transaction } from '../types'

export type TransactionDialogState =
  | { type: 'create' }
  | { type: 'edit'; transaction: Transaction }
  | { type: 'delete'; transaction: Transaction }
  | null

type TransactionDialogsProps = {
  dialog: TransactionDialogState
  onClose: () => void
}

export default function TransactionDialogs({ dialog, onClose }: TransactionDialogsProps) {
  const { t } = useTranslation()
  const money = useMoney()
  const { mutate: createTransaction } = useCreateTransaction()
  const { mutate: updateTransaction } = useUpdateTransaction()
  const { mutate: deleteTransaction } = useDeleteTransaction()

  const isFormOpen = dialog?.type === 'create' || dialog?.type === 'edit'

  const handleSubmit = (values: TransactionFormValues) => {
    if (dialog?.type === 'create') createTransaction(values)
    if (dialog?.type === 'edit') {
      updateTransaction({ id: dialog.transaction.id, changes: values })
    }
    onClose()
  }

  const handleDelete = () => {
    if (dialog?.type === 'delete') deleteTransaction(dialog.transaction.id)
    onClose()
  }

  const editing = dialog?.type === 'edit' ? dialog.transaction : null
  const deleting = dialog?.type === 'delete' ? dialog.transaction : null

  return (
    <>
      <Modal
        open={isFormOpen}
        title={editing ? t('transactions.form.editTitle') : t('transactions.form.title')}
        closeLabel={t('common.close')}
        onClose={onClose}
      >
        <TransactionForm
          key={editing?.id ?? 'create'}
          defaultValues={
            editing
              ? {
                  type: editing.type,
                  amount: editing.amount,
                  categoryId: editing.categoryId,
                  date: editing.date,
                  note: editing.note,
                }
              : undefined
          }
          submitLabel={editing ? t('transactions.form.save') : t('transactions.form.create')}
          onSubmit={handleSubmit}
          onCancel={onClose}
        />
      </Modal>

      <ConfirmDialog
        open={deleting !== null}
        title={t('transactions.deleteConfirm.title')}
        message={t('transactions.deleteConfirm.message', {
          name: deleting
            ? `${t(`categories.${deleting.categoryId}`)}, ${money(deleting.amount)}`
            : '',
        })}
        confirmLabel={t('transactions.deleteConfirm.confirm')}
        onConfirm={handleDelete}
        onCancel={onClose}
      />
    </>
  )
}
