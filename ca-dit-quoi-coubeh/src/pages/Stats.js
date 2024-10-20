import React, { useEffect, useRef } from 'react';
import Plotly from 'plotly.js-dist';

const dataPerTheme = {
  "Ton accueil à l'hôpital et dans le service de soins": [
    {
      question: "T’as trouvé l’accueil comment en arrivant ?",
      options: ["Super top", "Sympa", "Bof", "À éviter"],
      values: [30, 50, 10, 10]
    },
    {
      question: "Tu sais qui s’occupe de toi ?",
      options: ["Tout est clair", "J’ai capté", "Ça se mélange", "C’est qui eux ?"],
      values: [40, 30, 20, 10]
    },
    {
      question: "Le livret d’accueil, il t’a servi à quelque chose ?",
      options: ["Trop utile", "J’ai regardé", "Ça m’a pas aidé", "Quel livret ?"],
      values: [25, 35, 25, 15]
    }
  ],
  "Mon confort": [
    {
      question: "Ta chambre, c’est comment ?",
      options: ["5 étoiles", "Relaxant", "Ça passe", "Pas top"],
      values: [20, 30, 35, 15]
    },
    {
      question: "Le ménage, ça le fait ?",
      options: ["Nickel", "Propre", "Ça peut mieux", "Pire"],
      values: [45, 25, 20, 10]
    },
    {
      question: "Les repas ici, t’en penses quoi ?",
      options: ["Resto", "Pas mal", "Ça se mange", "Régime forcé"],
      values: [15, 30, 35, 20]
    }
  ]
  // Ajoute les autres thématiques ici
};

export default function CustomerSatisfactionDashboard() {
  const chartRefs = useRef({}); // To store refs for each question's chart

  useEffect(() => {
    Object.keys(dataPerTheme).forEach((theme) => {
      dataPerTheme[theme].forEach((questionData, index) => {
        const chartId = `${theme}-${index}`;
        const chartDiv = chartRefs.current[chartId];
        if (chartDiv) {
          const data = [
            {
              type: "bar",
              x: questionData.options,
              y: questionData.values,
              marker: {
                color: [
                  'rgba(0, 255, 0, 0.7)', // Jaune doré
                  'rgba(0, 255, 0, 0.7)',   // Vert
                  'rgba(0, 255, 0, 0.7)', // Orange
                  'rgba(0, 255, 0, 0.7)',   // Bleu
                ],
                line: {
                  color: 'rgba(0, 0, 0, 1)', // Couleur du contour (noir)
                  width: 2,                  // Épaisseur du contour
                },
              },
            },
          ];

          const layout = {
            title: questionData.question,
            margin: { t: 30, b: 50, l: 50, r: 20 },
            xaxis: { title: "", tickfont: { color: 'white' } }, // Supprime le titre de l'axe X et met la couleur des ticks en blanc
            yaxis: { title: "", tickfont: { color: 'white' } }, // Supprime le titre de l'axe Y et met la couleur des ticks en blanc
            height: 300, // Hauteur fixe pour tous les graphiques
            width: 400,  // Largeur fixe pour tous les graphiques
            paper_bgcolor: 'rgba(255, 255, 255, 0)', // Fond transparent
            plot_bgcolor: 'rgba(255, 255, 255, 0)',  // Fond du tracé transparent
            font: { color: 'white' }, // Couleur de la police en blanc
          };

          const config = {
            staticPlot: true, // Rendre le graphique statique (désactive les interactions)
            displayModeBar: false, // Cache la barre d'outils
          };

          Plotly.newPlot(chartDiv, data, layout, config);
        }
      });
    });

    // Cleanup function
    return () => {
      Object.keys(dataPerTheme).forEach((theme) => {
        dataPerTheme[theme].forEach((_, index) => {
          const chartId = `${theme}-${index}`;
          if (chartRefs.current[chartId]) {
            Plotly.purge(chartRefs.current[chartId]);
          }
        });
      });
    };
  }, []);

  return (
    <div style={{color:'#fff', textAlign:'center'}}>
      <h1 style={{ color: 'white' }}>Customer Satisfaction Dashboard</h1> {/* Couleur du titre en blanc */}
      {Object.keys(dataPerTheme).map((theme) => (
        <div key={theme} style={{ marginBottom: '50px' }}>
          <h2 style={{ color: 'white' }}>{theme}</h2> {/* Couleur du sous-titre en blanc */}
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between' }}>
            {dataPerTheme[theme].map((questionData, index) => (
              <div key={index} style={{ flex: '1 1 30%', margin: '10px', minWidth: '400px' }}>
                <div ref={(el) => (chartRefs.current[`${theme}-${index}`] = el)} style={{ height: '400px', width: '400px' }}></div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
