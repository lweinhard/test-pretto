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

const NONEMPLOYEE_REQUIREMENTS = {
  avis_impots: 5,
}

const EMPLOYEE_REQUIREMENTS = {
  avis_impots: 3,
  bulletins_salaire: 3,
}

const CNI_REQUIREMENTS = {
  cni: 1,
}

const DOCUMENT_KINDS = ['offre_pret', 'tableau_amortissement', 'estimation_bien', 'compromis_vente', 'livret_famille', 'avis_impots', 'bulletins_salaire', 'cni'];

const isMarried = (project) => project.mortgagors.findIndex(mortgagor => mortgagor.civil_status?.includes('marrie')) >= 0;
const isPurchaseProject = (project) => project.project_kind === 'achat';
const isRepurchaseProject = (project) => project.project_kind === 'rachat';
const globalRequirementsCheck = [
  { function: isMarried, result: true, requirements: MARRIED_REQUIREMENTS },
  { function: isPurchaseProject, result: true, requirements: PURCHASE_REQUIREMENTS },
  { function: isRepurchaseProject, result: true, requirements: REPURCHASE_REQUIREMENTS },
]

const isEmployee = (mortgagor) => mortgagor.contract === 'salarié';
const personalRequirementsCheck = [
  { function: isEmployee, result: true, requirements: EMPLOYEE_REQUIREMENTS },
  { function: isEmployee, result: false, requirements: NONEMPLOYEE_REQUIREMENTS },
]

const createMortgagorRequirements = (mortgagor) => ({ id: mortgagor.id, ...CNI_REQUIREMENTS })

const fetchRequirements = (project) => {
  let projectRequirements = {};
  for (const requirementCheck of globalRequirementsCheck) {
    if (requirementCheck.function(project) === requirementCheck.result) {
      projectRequirements.global = {
        ...projectRequirements.global,
        ...requirementCheck.requirements,
      }
    }
  }

  const mortgagorsRequirements = project.mortgagors.map(mortgagor => {
    let mortgagorRequirements = createMortgagorRequirements(mortgagor);
    for (const requirementCheck of personalRequirementsCheck) {
      if (requirementCheck.function(mortgagor) === requirementCheck.result) {
        mortgagorRequirements = {
          ...mortgagorRequirements,
          ...requirementCheck.requirements,
        }
      }
    }
    return mortgagorRequirements;
  })

  return {
    ...projectRequirements,
    married: isMarried(project),
    mortgagors: mortgagorsRequirements,
  }
}

export const calculateValidatedDocumentsPercentage = (documents, project) => {
  const requirements = fetchRequirements(project);
  const validatedRequirementsPercentages = [];
  const { id: project_id } = project;

  for (const [requiredDocument, requiredAmount] of Object.entries(requirements.global)) {
    const validatedDocumentsCount = documents.filter(document => document.project_id === project_id && document.document === requiredDocument && document.status === 'validé').length;
    validatedRequirementsPercentages.push({ type: requiredDocument, percentage: validatedDocumentsCount / requiredAmount });
  }

  for (const mortgagor of requirements.mortgagors) {
    const { id: mortgagor_id, ...mortgagorRequirements } = mortgagor;
    for (const [requiredDocument, requiredAmount] of Object.entries(mortgagorRequirements)) {
      const validatedDocumentsCount = documents.filter(document => document.mortgagor_id === mortgagor_id && document.document === requiredDocument && document.status === 'validé').length;
      validatedRequirementsPercentages.push({ type: requiredDocument, percentage: validatedDocumentsCount / requiredAmount });
    }
  }
  const totalPercentage = validatedRequirementsPercentages.reduce((acc, curr) => acc + curr.percentage, 0) / validatedRequirementsPercentages.length;
  console.log(validatedRequirementsPercentages);
  console.log(totalPercentage);
}
