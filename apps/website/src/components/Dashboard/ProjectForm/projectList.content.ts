import { type Dictionary, t } from 'intlayer';

const projectListContent = {
  key: 'project-list',
  content: {
    selectButton: {
      text: t({
        en: 'Select project',
        fr: 'Sélectionner le projet',
        es: 'Seleccionar proyecto',
        'en-GB': 'Select project',
        de: 'Projekt auswählen',
        ja: 'プロジェクトを選択',
        ko: '프로젝트 선택',
        zh: '选择项目',
        it: 'Seleziona progetto',
        pt: 'Selecione o projeto',
        hi: 'परियोजना चुनें',
        ar: 'اختر المشروع',
        ru: 'Выберите проект',
        tr: 'Proje seç',
      }),
      label: t({
        en: 'Click to select project',
        fr: 'Cliquez pour sélectionner le projet',
        es: 'Haga clic para seleccionar el proyecto',
        'en-GB': 'Click to select project',
        de: 'Klicken Sie, um das Projekt auszuwählen',
        ja: 'プロジェクトを選択するにはクリックしてください',
        ko: '프로젝트를 선택하려면 클릭하세요',
        zh: '点击选择项目',
        it: 'Clicca per selezionare il progetto',
        pt: 'Clique para selecionar o projeto',
        hi: 'परियोजना चुनने के लिए क्लिक करें',
        ar: 'انقر لاختيار المشروع',
        ru: 'Нажмите, чтобы выбрать проект',
        tr: 'Projeyi seçmek için tıklayın',
      }),
    },
  },
} satisfies Dictionary;

export default projectListContent;
