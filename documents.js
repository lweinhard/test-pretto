import { fetchMortgagorsRequirements } from './mortgagor.js';
import { isEmployee, isMarried } from './utils.js';

const fetchRequirements = (project) => {
  const projectRequirements = fetchProjectRequirements(project);
  const isMarriedProject = isMarried(project);
  const mortgagorsRequirements = fetchMortgagorsRequirements(project, isMarriedProject);
  const hasOnlyEmployee = project.mortgagors.every(isEmployee);

  if (isMarriedProject) {
    projectRequirements.global.avis_impots = (hasOnlyEmployee ? 3 : 5);
  }

  return {
    ...projectRequirements,
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
