import AsyncSelect from 'react-select/async';
import { Api, RequestParams } from './BsddApi';

interface Option {
  label: string;
  value: string;
}

interface Props {
  api: Api<unknown>;
  activeDomains: Option[];
  setActiveClassificationUri: (value: string) => void;
  accessToken: string;
}

//https://medium.com/how-to-react/react-select-dropdown-tutorial-using-react-select-51664ab8b6f3
function Search({ api, activeDomains, setActiveClassificationUri, accessToken }: Props) {
  const params: RequestParams = {
    headers: { Accept: 'text/plain' },
  };

  if (accessToken !== '') {
    params.headers = { ...params.headers, Authorization: 'Bearer ' + accessToken };
  }

  const loadOptions = (inputValue: string, callback: (options: any[]) => void) => {
    if (activeDomains.length === 1 && accessToken) {
      const queryParameters = {
        SearchText: inputValue,
        DomainNamespaceUri: activeDomains[0].value,
        // LanguageCode: 'NL',
        // RelatedIfcEntities: 'IfcWall',
      };
      api.api.searchListV2List(queryParameters, params).then((response) => {
        const searchResult = response.data;
        console.log(searchResult);
        if (searchResult.numberOfClassificationsFound) {
          const domains = response.data.domains;
          if (domains && domains[0] && domains[0].classifications) {
            callback(
              domains[0].classifications.map((c) => ({
                value: c.namespaceUri,
                label: c.name,
              })),
            );
          }
        }
      });
    } else if (inputValue.length > 2) {
      const queryParameters = {
        SearchText: inputValue,
        DomainNamespaceUris: activeDomains.map((domain) => domain.value),
        // RelatedIfcEntities: 'IfcWall',
      };
      api.api.classificationSearchOpenV1List(queryParameters, params).then((response) => {
        if (response.data.classifications) {
          callback(
            response.data.classifications.map((c) => ({
              value: c.namespaceUri,
              label: c.name,
            })),
          );
        }
      });
    } else {
      callback([]);
    }
  };

  const handleOnChange = (e: any) => {
    setActiveClassificationUri(e.value);
  };

  return (
    <div>
      <AsyncSelect
        loadOptions={loadOptions}
        defaultOptions
        placeholder={<div>bSDD search...</div>}
        onChange={(e) => handleOnChange(e)}
      />
    </div>
  );
}

export default Search;
