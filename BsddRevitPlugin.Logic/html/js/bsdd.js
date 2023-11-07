const bsddUrl = 'https://test.bsdd.buildingsmart.org';

function getDomainClassifications(domainNamespaceUri) {
  const url = bsddUrl + '/api/Domain/v2/Classifications';
  return new Promise((resolve, reject) => {
    $.ajax({
      url: url,
      type: 'GET',
      data: {
        namespaceUri: domainNamespaceUri
      },
      success: function (data) {
        resolve(data)
      },
      error: function (error) {
        reject(error)
      },
    })
  })
}

function getClassification(domainNamespaceUri) {
  const url = bsddUrl + "/api/Classification/v3";
  return new Promise((resolve, reject) => {
    $.ajax({
      url: url,
      type: 'GET',
      data: {
        namespaceUri: domainNamespaceUri
      },
      success: function (data) {
        resolve(data)
      },
      error: function (error) {
        reject(error)
      },
    })
  })
}

function getDomain(domainNamespaceUri) {
  const url = bsddUrl + '/api/Domain/v2';
  return new Promise((resolve, reject) => {
    $.ajax({
      url: url,
      type: 'GET',
      data: {
        namespaceUri: domainNamespaceUri
      },
      success: function (data) {
        resolve(data)
      },
      error: function (error) {
        reject(error)
      },
    })
  })
}

// Get Property details
function getProperty(namespaceUri) {
  const url = bsddUrl + '/api/Property/v2';
  return new Promise((resolve, reject) => {
    $.ajax({
      url: url,
      type: 'GET',
      data: {
        namespaceUri: namespaceUri
      },
      success: function (data) {
        resolve(data)
      },
      error: function (error) {
        reject(error)
      },
    })
  })
}