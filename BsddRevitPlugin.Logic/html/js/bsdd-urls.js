const baseUrlProduction = 'https://api.bsdd.buildingsmart.org/';
const baseUrlTest = 'https://test.bsdd.buildingsmart.org/';

const classification = 'api/Classification/v3';
const domain = 'api/Domain/v2';
const textSearchListOpen = 'api/TextSearchListOpen/v5';

const bsddEnvironment = {
  production: {
    bsddClassificationUrl: baseUrlProduction + classification,
    bsddDomainUrl: baseUrlProduction + domain,
    bsddSearchUrl: baseUrlProduction + textSearchListOpen
  },
  test: {
    bsddClassificationUrl: baseUrlTest + classification,
    bsddDomainUrl: baseUrlTest + domain,
    bsddSearchUrl: baseUrlTest + textSearchListOpen
  }
};