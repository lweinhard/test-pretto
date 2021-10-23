import { calculateValidatedDocumentsPercentage } from './documents.js'

const projects = [
  {
    id: 1,
    mortgagors: [
      { id: 1, first_name: 'Mélanie', contract: 'avocat', civil_status: 'marrie_sans_contrat' },
      { id: 2, first_name: 'Bertrand', contract: 'salarié', civil_status: 'marrie_sans_contrat' }
    ],
    project_kind: 'achat'
  },

  { id: 2, mortgagors: [{ id: 3, first_name: 'Jeanne', contract: 'salarié' }], project_kind: 'rachat' }
];

const documents = [
  { id: 1, document: 'cni', project_id: 1, mortgagor_id: 1, status: 'refusé', mois: null, year: null },
  { id: 2, document: 'cni', project_id: 1, mortgagor_id: 2, status: 'validé', mois: null, year: null },
  { id: 3, document: 'cni', project_id: 1, mortgagor_id: 1, status: 'validé', mois: null, year: null },
  { id: 4, document: 'cni', project_id: 2, mortgagor_id: 3, status: 'validé', mois: null, year: null },
  { id: 5, document: 'livret_famille', project_id: 1, mortgagor_id: null, status: 'validé', mois: null, year: null },
  { id: 6, document: 'bulletins_salaire', project_id: 1, mortgagor_id: 2, status: 'empty', mois: 1, year: 2021 },
  { id: 7, document: 'bulletins_salaire', project_id: 1, mortgagor_id: 2, status: 'validé', mois: 2, year: 2021 },
  { id: 8, document: 'bulletins_salaire', project_id: 1, mortgagor_id: 2, status: 'validé', mois: 3, year: 2021 },
  { id: 9, document: 'avis_impots', project_id: 1, mortgagor_id: null, status: 'validé', mois: null, year: 2020 },
  { id: 10, document: 'avis_impots', project_id: 1, mortgagor_id: null, status: 'validé', mois: null, year: 2019 },
  { id: 11, document: 'avis_impots', project_id: 1, mortgagor_id: null, status: 'validé', mois: null, year: 2018 },
  { id: 12, document: 'avis_impots', project_id: 1, mortgagor_id: null, status: 'validé', mois: null, year: 2017 },
  { id: 13, document: 'avis_impots', project_id: 2, mortgagor_id: 3, status: 'validé', mois: null, year: 2019 },
  { id: 14, document: 'avis_impots', project_id: 2, mortgagor_id: 3, status: 'validé', mois: null, year: 2020 },
  { id: 15, document: 'offre_pret', project_id: 2, mortgagor_id: null, status: 'validé', mois: null, year: null },
  { id: 16, document: 'tableau_amortissement', project_id: 2, mortgagor_id: null, status: 'validé', mois: null, year: null },
  { id: 17, document: 'estimation_bien', project_id: 2, mortgagor_id: null, status: 'validé', mois: null, year: null },
  { id: 18, document: 'avis_impots', project_id: 2, mortgagor_id: 3, status: 'validé', mois: null, year: 2018 }
];

const projectOneDocuments = documents.filter(document => document.project_id === 1);
const projectTwoDocuments = documents.filter(document => document.project_id === 2);
const projectOne = projects.find(project => project.id === 1);
const projectTwo = projects.find(project => project.id === 2);

calculateValidatedDocumentsPercentage(projectOneDocuments, projectOne);
calculateValidatedDocumentsPercentage(projectTwoDocuments, projectTwo);
