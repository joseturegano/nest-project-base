import type { Config } from '@jest/types';

// Configura tiempos límite según el tipo de prueba
const configureTimeouts = (projectConfig: Config.ProjectConfig) => {
  jest.setTimeout(10000);

  const testType = projectConfig.displayName?.name || 'unit';
  
  switch (testType) {
    case 'e2e':
      jest.setTimeout(30000);
      break;
    case 'integration':
      jest.setTimeout(15000);
      break;
    default:
      jest.setTimeout(10000);
  }
};

export default configureTimeouts;
