import { t, type Dictionary } from 'intlayer';

export const navigationViewContent = {
  key: 'navigation-view',
  content: {
    tsxNotEditable: t({
      en: 'React node is not editable',
      'en-GB': 'React node is not editable',
      fr: 'Node React non éditable',
      es: 'Nodo React no editable',
      de: 'React-Knoten ist nicht bearbeitbar',
      ja: '編集できないReactノードです',
      ko: '편집할 수 없는 React 노드입니다',
      zh: '不可编辑的 React 节点',
      it: 'Node React non modificabile',
      pt: 'Nó React não editável',
      hi: 'सम्पादित न करने योग्य React नोड',
      ar: 'عقدة React غير قابلة للتحرير',
      ru: 'React-узел не редактируемый',
    }),
    goToField: {
      label: t({
        en: 'Go to field',
        'en-GB': 'Go to field',
        fr: 'Aller au champ',
        es: 'Ir al campo',
        de: 'Zum Feld gehen',
        ja: 'フィールドに移動',
        ko: '필드로 이동',
        zh: '转到字段',
        it: 'Vai al campo',
        pt: 'Ir para o campo',
        hi: 'फ़ील्ड पर जाएं',
        ar: 'اذهب إلى الحقل',
        ru: 'Перейти к полю',
      }),
    },
    addNewElement: {
      label: t({
        en: 'Click to add element',
        'en-GB': 'Click to add element',
        fr: 'Cliquez pour ajouter un élément',
        es: 'Haga clic para agregar un elemento',
        de: 'Klicken Sie, um ein Element hinzuzufügen',
        ja: '要素を追加するにはクリック',
        ko: '요소를 추가하려면 클릭하세요',
        zh: '点击添加元素',
        it: 'Clicca per aggiungere un elemento',
        pt: 'Clique para adicionar um elemento',
        hi: 'तत्व जोड़ने के लिए क्लिक करें',
        ar: 'انقر لإضافة عنصر',
        ru: 'Нажмите, чтобы добавить элемент',
      }),
      text: t({
        en: 'Add new element',
        'en-GB': 'Add new element',
        fr: 'Ajouter un nouvel élément',
        es: 'Agregar nuevo elemento',
        de: 'Neues Element hinzufügen',
        ja: '新しい要素を追加',
        ko: '새 요소 추가',
        zh: '添加新元素',
        it: 'Aggiungi nuovo elemento',
        pt: 'Adicionar novo elemento',
        hi: 'नया तत्व जोड़ें',
        ar: 'أضف عنصرًا جديدًا',
        ru: 'Добавить новый элемент',
      }),
    },
    removeElement: {
      label: t({
        en: 'Click to remove element',
        'en-GB': 'Click to remove element',
        fr: 'Cliquez pour supprimer un élément',
        es: 'Haga clic para eliminar un elemento',
        de: 'Klicken Sie, um ein Element zu entfernen',
        ja: '要素を削除するにはクリック',
        ko: '요소를 제거하려면 클릭하세요',
        zh: '点击删除元素',
        it: 'Clicca per rimuovere un elemento',
        pt: 'Clique para remover um elemento',
        hi: 'तत्व निकालने के लिए क्लिक करें',
        ar: 'انقر لإزالة عنصر',
        ru: 'Нажмите, чтобы удалить элемент',
      }),
      text: t({
        en: 'Remove element',
        'en-GB': 'Remove element',
        fr: 'Supprimer l’élément',
        es: 'Eliminar elemento',
        de: 'Element entfernen',
        ja: '要素を削除',
        ko: '요소 제거',
        zh: '删除元素',
        it: 'Rimuovi elemento',
        pt: 'Remover elemento',
        hi: 'तत्व निकालें',
        ar: 'إزالة عنصر',
        ru: 'Удалить элемент',
      }),
    },
    addNewEnumeration: {
      label: t({
        en: 'Click to add enumeration',
        'en-GB': 'Click to add enumeration',
        fr: 'Cliquez pour ajouter une énumération',
        es: 'Haga clic para agregar una enumeración',
        de: 'Klicken Sie, um eine Aufzählung hinzuzufügen',
        ja: '列挙を追加するにはクリック',
        ko: '열거를 추가하려면 클릭하세요',
        zh: '点击添加枚举',
        it: 'Clicca per aggiungere un enumerazione',
        pt: 'Clique para adicionar uma enumeração',
        hi: 'सूची जोड़ने के लिए क्लिक करें',
        ar: 'انقر لإضافة تعداد',
        ru: 'Нажмите, чтобы добавить перечисление',
      }),
      text: t({
        en: 'Add new enumeration',
        'en-GB': 'Add new enumeration',
        fr: 'Ajouter une nouvelle énumération',
        es: 'Agregar nueva enumeración',
        de: 'Neue Aufzählung hinzufügen',
        ja: '新しい列挙を追加',
        ko: '새 목록 추가',
        zh: '添加新枚举',
        it: 'Aggiungi nuova enumerazione',
        pt: 'Adicionar nova enumeração',
        hi: 'नया सूची जोड़ें',
        ar: 'أضف تعدادًا جديدًا',
        ru: 'Добавить новое перечисление',
      }),
    },
    removeEnumeration: {
      label: t({
        en: 'Click to remove enumeration',
        'en-GB': 'Click to remove enumeration',
        fr: 'Cliquez pour supprimer une énumération',
        es: 'Haga clic para eliminar una enumeración',
        de: 'Klicken Sie, um eine Aufzählung zu entfernen',
        ja: '列挙を削除するにはクリック',
        ko: '목록을 제거하려면 클릭하세요',
        zh: '点击删除枚举',
        it: "Clicca per rimuovere un'enumerazione",
        pt: 'Clique para remover uma enumeração',
        hi: 'सूची निकालने के लिए क्लिक करें',
        ar: 'انقر لإزالة تعداد',
        ru: 'Нажмите, чтобы удалить перечисление',
      }),
      text: t({
        en: 'Remove enumeration',
        'en-GB': 'Remove enumeration',
        fr: 'Supprimer l’énumération',
        es: 'Eliminar enumeración',
        de: 'Aufzählung entfernen',
        ja: '列挙を削除',
        ko: '목록 제거',
        zh: '删除枚举',
        it: 'Rimuovi enumerazione',
        pt: 'Remover enumeração',
        hi: 'सूची निकालें',
        ar: 'إزالة تعداد',
        ru: 'Удалить перечисление',
      }),
    },
    addNewCondition: {
      label: t({
        en: 'Click to add condition',
        'en-GB': 'Click to add condition',
        fr: 'Cliquez pour ajouter une condition',
        es: 'Haga clic para agregar una condición',
        de: 'Klicken Sie, um eine Bedingung hinzuzufügen',
        ja: '条件を追加するにはクリック',
        ko: '조건을 추가하려면 클릭하세요',
        zh: '点击添加条件',
        it: 'Clicca per aggiungere una condizione',
        pt: 'Clique para adicionar uma condição',
        hi: 'शर्ते जोड़ने के लिए क्लिक करें',
        ar: 'انقر لإضافة شرط',
        ru: 'Нажмите, чтобы добавить условие',
      }),
      text: t({
        en: 'Add new condition',
        'en-GB': 'Add new condition',
        fr: 'Ajouter une nouvelle condition',
        es: 'Agregar nueva condición',
        de: 'Neue Bedingung hinzufügen',
        ja: '新しい条件を追加',
        ko: '새 조건 추가',
        zh: '添加新条件',
        it: 'Aggiungi nuova condizione',
        pt: 'Adicionar nova condição',
        hi: 'नया शर्ते जोड़ें',
        ar: 'أضف شرطًا جديدًا',
        ru: 'Добавить новое условие',
      }),
    },
  },
} satisfies Dictionary;
