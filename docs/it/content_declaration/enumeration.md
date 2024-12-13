# Enumerazione / Pluralizzazione

## Come Funziona l'Enumerazione

In Intlayer, l'enumerazione è realizzata attraverso la funzione `enu`, che mappa chiavi specifiche ai loro contenuti corrispondenti. Queste chiavi possono rappresentare valori numerici, intervalli o identificatori personalizzati. Quando utilizzato con React Intlayer o Next Intlayer, il contenuto appropriato viene selezionato automaticamente in base alla locale dell'applicazione e alle regole definite.

## Configurare l'Enumerazione

Per configurare l'enumerazione nel tuo progetto Intlayer, devi creare un modulo di contenuto che include le definizioni di enumerazione. Ecco un esempio di una semplice enumerazione per il numero di auto:

```typescript
import { enu, type DeclarationContent } from "intlayer";

const carEnumeration = {
  key: "car_count",
  content: {
    numberOfCar: enu({
      "<-1": "Meno di meno di una auto",
      "-1": "Meno di una auto",
      "0": "Nessuna auto",
      "1": "Una auto",
      ">5": "Alcune auto",
      ">19": "Molte auto",
    }),
  },
} satisfies DeclarationContent;

export default carEnumeration;
```

In questo esempio, `enu` mappa varie condizioni a contenuti specifici. Quando utilizzato in un componente React, Intlayer può scegliere automaticamente il contenuto appropriato in base alla variabile fornita.

## Utilizzare l'Enumerazione con React Intlayer

Per utilizzare l'enumerazione in un componente React, puoi sfruttare il hook `useIntlayer` dal pacchetto `react-intlayer`. Questo hook recupera il contenuto corretto in base all'ID specificato. Ecco un esempio di come utilizzarlo:

```javascript
import { useIntlayer } from "react-intlayer";

const CarComponent = () => {
  const content = useIntlayer("car_count");

  return (
    <div>
      <p>{content.numberOfCar(0)}</p> {/* Output: Nessuna auto */}
      <p>{content.numberOfCar(6)}</p> {/* Output: Alcune auto */}
      <p>{content.numberOfCar(20)}</p> {/* Output: Alcune auto */}
    </div>
  );
};

export default CarComponent;
```

In questo esempio, il componente adatta dinamicamente la propria uscita in base al numero di auto. Il contenuto corretto viene scelto automaticamente, a seconda dell'intervallo specificato.

## Note Importanti

- L'ordine di dichiarazione è cruciale nelle enumerazioni Intlayer. La prima dichiarazione valida è quella che verrà selezionata.
- Se più condizioni si applicano, assicurati che siano ordinate correttamente per evitare comportamenti inaspettati.

## Migliori Pratiche per l'Enumerazione

Per garantire che le tue enumerazioni funzionino come previsto, segui queste migliori pratiche:

- **Nomenclatura Consistente**: Usa ID chiari e coerenti per i moduli di enumerazione per evitare confusione.
- **Documentazione**: Documenta le tue chiavi di enumerazione e i loro output attesi per garantire la manutenzione futura.
- **Gestione degli Errori**: Implementa la gestione degli errori per gestire i casi in cui non viene trovata alcuna enumerazione valida.
- **Ottimizza le Prestazioni**: Per applicazioni grandi, riduci il numero di estensioni di file monitorate per migliorare le prestazioni.

## Risorse Aggiuntive

Per ulteriori informazioni dettagliate sulla configurazione e sull'uso, fai riferimento alle seguenti risorse:

- [Documentazione Intlayer CLI](https://github.com/aymericzip/intlayer/blob/main/docs/it/intlayer_cli.md)
- [Documentazione React Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/it/intlayer_with_create_react_app.md)
- [Documentazione Next Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/it/intlayer_with_nextjs_15.md)

Queste risorse forniscono ulteriori informazioni sull'impostazione e sull'uso di Intlayer in diversi ambienti e con vari framework.
