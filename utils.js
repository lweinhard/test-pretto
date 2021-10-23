export const isEmployee = (mortgagor) => mortgagor.contract === 'salarié';
export const isMarried = (project) => project.mortgagors.findIndex(mortgagor => mortgagor.civil_status?.includes('marrie')) >= 0;
export const isPurchaseProject = (project) => project.project_kind === 'achat';
export const isRepurchaseProject = (project) => project.project_kind === 'rachat';
