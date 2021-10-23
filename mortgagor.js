import { isEmployee } from './utils.js'

const CNI_REQUIREMENTS = {
  cni: 1,
}

const EMPLOYEE_REQUIREMENTS = {
  bulletins_salaire: 3,
}

const mortgagorChecks = [
  { function: isEmployee, requirements: EMPLOYEE_REQUIREMENTS },
]

const createMortgagorRequirements = (mortgagor, project) => ({ id: mortgagor.id, ...CNI_REQUIREMENTS });

export const fetchMortgagorsRequirements = (project, isMarriedProject) => project.mortgagors.map(mortgagor => {
  let mortgagorRequirements = createMortgagorRequirements(mortgagor, project);
  if (!isMarriedProject) {
    mortgagorRequirements.avis_impots = (isEmployee(mortgagor) ? 3 : 5);
  }
  for (const mortgagorCheck of mortgagorChecks) {
    if (mortgagorCheck.function(mortgagor)) {
      mortgagorRequirements = {
        ...mortgagorRequirements,
        ...mortgagorCheck.requirements,
      }
    }
  }
  return mortgagorRequirements;
});
