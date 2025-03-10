import { t, type Dictionary } from 'intlayer';

const deleteTagModalContent = {
  key: 'delete-tag-modal',
  content: {
    title: t({
      en: 'Delete tag',
      fr: 'Supprimer le tag',
      es: 'Eliminar etiqueta',
      'en-GB': 'Delete tag',
      de: 'Tag löschen',
      ja: 'タグを削除',
      ko: '태그 삭제',
      zh: '删除标签',
      it: 'Elimina tag',
      pt: 'Excluir tag',
      hi: 'टैग हटाएं',
      ar: 'حذف الوسم',
      ru: 'Удалить тег',
    }),

    description: t({
      en: 'Are you sure you want to delete this tag?',
      fr: 'Êtes-vous sûr de vouloir supprimer ce tag ?',
      es: '¿Está seguro de que desea eliminar esta etiqueta?',
      'en-GB': 'Are you sure you want to delete this tag?',
      de: 'Sind Sie sicher, dass Sie diesen Tag löschen möchten?',
      ja: 'このタグを削除してもよろしいですか？',
      ko: '이 태그를 삭제하시겠습니까?',
      zh: '您确定要删除此标签吗？',
      it: 'Sei sicuro di voler eliminare questo tag?',
      pt: 'Tem certeza de que deseja excluir este tag?',
      hi: 'क्या आप इस टैग को हटाना चाहते हैं?',
      ar: 'هل أنت متأكد من أنك تريد حذف هذا الوسم؟',
      ru: 'Вы уверены, что хотите удалить этот тег?',
    }),

    confirmButton: {
      text: t({
        en: 'Delete',
        fr: 'Supprimer',
        es: 'Eliminar',
        'en-GB': 'Delete',
        de: 'Löschen',
        ja: '削除',
        ko: '삭제',
        zh: '删除',
        it: 'Elimina',
        pt: 'Excluir',
        hi: 'हटाएं',
        ar: 'حذف',
        ru: 'Удалить',
      }),
      label: t({
        en: 'Click to delete tag',
        fr: 'Cliquez pour supprimer le tag',
        es: 'Haga clic para eliminar la etiqueta',
        'en-GB': 'Click to delete tag',
        de: 'Klicken Sie, um das Tag zu löschen',
        ja: 'タグを削除するにはクリックしてください',
        ko: '태그를 삭제하려면 클릭하세요',
        zh: '点击删除标签',
        it: 'Clicca per eliminare il tag',
        pt: 'Clique para excluir o tag',
        hi: 'टैग को हटाने के लिए क्लिक करें',
        ar: 'انقر لحذف الوسم',
        ru: 'Нажмите, чтобы удалить тег',
      }),
    },

    cancelButton: {
      text: t({
        en: 'Cancel',
        fr: 'Annuler',
        es: 'Cancelar',
        'en-GB': 'Cancel',
        de: 'Abbrechen',
        ja: 'キャンセル',
        ko: '취소',
        zh: '取消',
        it: 'Annulla',
        pt: 'Cancelar',
        hi: 'रद्द करें',
        ar: 'إلغاء',
        ru: 'Отменить',
      }),
      label: t({
        en: 'Click to cancel',
        fr: 'Cliquez pour annuler',
        es: 'Haga clic para cancelar',
        'en-GB': 'Click to cancel',
        de: 'Klicken Sie, um abzubrechen',
        ja: 'キャンセルをクリックしてください',
        ko: '취소를 클릭하세요',
        zh: '点击取消',
        it: 'Clicca per annullare',
        pt: 'Clique para cancelar',
        hi: 'रद्द करने के लिए क्लिक करें',
        ar: 'انقر لإلغاء',
        ru: 'Нажмите, чтобы отменить',
      }),
    },
  },
} satisfies Dictionary;

export default deleteTagModalContent;
