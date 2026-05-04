Jag har gjort en simpel to do list eller task manager som hämtar data från jsonplaceholder.
GET används för att hämta tasks
POST används för att skapa och lägga upp en task med en titel och body, med validering: man behöver minst en titel. Jag la till en completion toggle för att checka av tasks och en prioritering toggle[!].
PUT används för att uppdatera en task, man kan redigera titel och body
DELETE tar bort en task med ett rött kryss på högra sidan av kortet men en bekräftelse innan tasks tas bort.

Jag valde att gå för dessa VG punkter:
Laddningsindikation
Validering av formulär
Sökfunktion
Bekräftelse innan borttagning

Vad innebär det att en webbplats är tillgänglig?
Att en hemsida är användbar för alla användare oavsett om de har en funktionsnedsättning. Man ska kunna navigera och interagera med webbplatsen lätt med tydligt och strukterat innehåll.

Varför är tillgänglighet viktig vid utveckling av webbapplikationer?
Man inkluderar fler användare och diskriminerar inte någon för deras funktionsnedsättning genom att bygga sin webbplats med tillgänglighet i åtanke. EU:s tillgänglighetsdirektiv har krav på att digitala tjänster ska vara tillgängliga.

Ge tre konkreta exempel på hur ni kan göra en React-applikation mer tillgänglig.
1. Ha tydliga placeholders för texter och attribut, så användaren vet vart och vad de ska skriva in.
2. Säkerhetställa att alla funktioner går att använda med tagentborder t.ex tab för att navigera och enter för att aktivera.
3. Använder man semantiska HTML element (button, form etc) kan en skärmläsare förstå strukturen så någon med synnedsättning kan navigara och använda webbplatsen.

Ett litet exempel på tillgänglighet finns med i mitt projekt med "{{ cursor: "pointer" }}" på alla interaktiva knappar/checkbox så användaren vet att de kan klicka på dem.