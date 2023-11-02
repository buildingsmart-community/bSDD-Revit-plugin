import { useState, useEffect } from 'react';
import Select from 'react-select';
import { Api, DomainContractV3, RequestParams } from './BsddApi';

interface Option {
  label: string;
  value: string;
}

interface Props {
  api: Api<unknown>;
  activeDomains: Option[];
  setActiveDomains: (value: Option[]) => void;
  setDomains: (value: { [id: string]: DomainContractV3 }) => void;
  accessToken: string;
}

export default function SelectDomains({ api, activeDomains, setActiveDomains, setDomains, accessToken }: Props) {
  const [selectOptions, setSelectOptions] = useState<any[]>(activeDomains);
  const params: RequestParams = {
    headers: { Accept: 'text/plain' },
  };

  if (accessToken !== '') {
    params.headers = { ...params.headers, Authorization: 'Bearer ' + accessToken };
  }

  useEffect(() => {
    api.api.domainV3List(undefined, params).then((response) => {
      if (response.data) {
        setSelectOptions(
          response.data.map((domain) => ({
            value: domain.namespaceUri,
            label: domain.name,
          })),
        );
        setDomains(
          response.data.reduce((accumulator, domain) => {
            if (domain.namespaceUri) {
              return { ...accumulator, [domain.namespaceUri]: domain };
            }
            return { ...accumulator };
          }, {}),
        );
      }
    });
  }, [setSelectOptions, setDomains, accessToken]);

  const handleOnChange = (e: any) => {
    setActiveDomains(e.map((option: Option) => option));
  };

  return (
    <Select
      isMulti
      name="domains"
      options={selectOptions}
      className="basic-multi-select"
      classNamePrefix="select"
      placeholder={<div> filter domains...</div>}
      onChange={(e) => handleOnChange(e)}
      defaultValue={activeDomains.map((domain) => domain)}
    />
  );
}
