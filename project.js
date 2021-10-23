import { isMarried, isPurchaseProject, isRepurchaseProject } from './utils.js';

const REPURCHASE_REQUIREMENTS = {
  offre_pret: 1,
  tableau_amortissement: 1,
  estimation_bien: 2,
}

const PURCHASE_REQUIREMENTS = {
  compromis_vente: 1,
}

const MARRIED_REQUIREMENTS = {
  livret_famille: 1,
}

const projectChecks = [
  { function: isMarried, requirements: MARRIED_REQUIREMENTS },
  { function: isPurchaseProject, requirements: PURCHASE_REQUIREMENTS },
  { function: isRepurchaseProject, requirements: REPURCHASE_REQUIREMENTS },
];

const fetchProjectRequirements = (project) => {
  const projectRequirements = {};

  for (const projectCheck of projectChecks) {
    if (projectCheck.function(project)) {
      projectRequirements.global = {
        ...projectRequirements.global,
        ...projectCheck.requirements,
      }
    }
  }
  return projectRequirements;
}
