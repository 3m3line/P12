//////filtres nav (type)
// Extraire les types de projets uniques (utiliser dans nav)
export const getUniqueProjectTypes = (data) => {
    return [...new Set(data.map(project => project.type))]; //utilisation de set pour type unique (pas de doublon)
};

//////filtres des tags (technologies)

// Fonction pour extraire les technologies uniques (utilisé dans app)
export const getUniqueTechnologies = (data) => {
    return Array.from(new Set(data.flatMap(item => item.technologie)));
};

// // Fonction pour filtrer les projets selon la technologie sélectionnée
// export const filterProjectsByTechnology = (data, selectedTech) => {
//     return selectedTech
//         ? data.filter(item => item.technologie.includes(selectedTech))
//         : data;
// };

// // Retourner les projets filtrés selon la technologie ou tous les projets si aucune n'est sélectionnée
// export const getFilteredProjects = (data, selectedTech) => {
//     return selectedTech ? filterProjectsByTechnology(data, selectedTech) : data;
//   };