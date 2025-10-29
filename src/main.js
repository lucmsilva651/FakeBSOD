import { createApp } from 'vue';
import { createI18n } from 'vue-i18n';
import App from './App.vue';

const i18n = createI18n({
  locale: 'pt',
  fallbackLocale: 'en',
  messages: {
    en: {
      mainText: "Your PC ran into a problem and needs to restart. We're just collecting some error info, and then we'll restart for you.",
      toObtainMoreInfo: "For more information about this issue and possible fixes, visit",
      ifYouNeedToContact: "If you call a support person, give them this info:",
      percentageText: "complete",
      stopCode: "Stop code"
    },
    pt: {
      mainText: "O dispositivo encontrou um problema e precisa ser reiniciado. Estamos coletando algumas informações sobre o erro e, em seguida, reiniciaremos para você.",
      toObtainMoreInfo: "Para obter mais informações sobre esse problema e as possíveis correções, visite",
      ifYouNeedToContact: "Se você ligar para o suporte, forneça estas informações:",
      stopCode: "Código de parada",
      percentageText: "concluído"
    },
    es: {
      mainText: "El dispositivo tuvo un problema y necesita reiniciarse. Vamos a recopilar información sobre el error y después podrá reiniciar.",
      toObtainMoreInfo: "Para obtener más información acerca de este problema y posibles correcciones, visita",
      ifYouNeedToContact: "Si Ilamas a una persona de soporte técnico, dates esta información:",
      stopCode: "Detener código",
      percentageText: "completar"
    },
    fr: {
      mainText: "Votre ordinateur a rencontré un problème et doit redémarrer. Nous collectons simplement des informations relatives aux erreurs, puis nous allons redémarrer l'ordinateur.",
      toObtainMoreInfo: "Pour plus d'informations sur ce problème et sur les solutions possibles, consultez",
      ifYouNeedToContact: "Si vous contactez l'assistance, transmettez-leur ces informations :",
      stopCode: "Code d'arrêt ",
      percentageText: "achevés"
    }
  }
});

const app = createApp(App);
app.use(i18n);
app.mount('#app');