import { useState } from 'react';
import { Form, Accordion, Row, Col, Card } from 'react-bootstrap';
import { MsalProvider } from '@azure/msal-react';
import { PublicClientApplication } from '@azure/msal-browser';

import Search from './Search';
import Classifications from './Classifications';
import PropertySets from './PropertySets';
import RecursiveMode from './RecursiveMode';
import SelectDomains from './SelectDomains';
import Apply from './Apply';
import { Api, ClassificationContractV4, DomainContractV3 } from './BsddApi';
import Authentication from './Authentication';

interface Option {
  label: string;
  value: string;
}

interface BsddConfig {
  baseUrl?: string;
  defaultDomains: Option[];
  defaultSearch: Option;
}

interface Props {
  callback: (value: IfcEntity) => void;
  config: BsddConfig;
  msalInstance: PublicClientApplication;
}

function BsddSearch({ callback, config, msalInstance }: Props) {
  const [activeClassificationUri, setActiveClassificationUri] = useState<string>();
  const [recursiveMode, setRecursiveMode] = useState<boolean>(false);
  const [activeDomains, setActiveDomains] = useState<Option[]>(getDefaultDomains());
  const [domains, setDomains] = useState<{ [id: string]: DomainContractV3 }>({});
  const [classifications, setClassifications] = useState<ClassificationContractV4[]>([]);
  const [propertySets, setPropertySets] = useState<{ [id: string]: IfcPropertySet }>({});
  const [accessToken, setAccessToken] = useState<string>('');
  const [api, setApi] = useState<Api<unknown>>(
    new Api({
      baseUrl: config.baseUrl || 'https://api.bsdd.buildingsmart.org',
      // baseApiParams
      // securityWorker
      // customFetch
    }),
  );

  function getDefaultDomains(): Option[] {
    if (config && config.defaultDomains && config.defaultDomains.length) {
      return config.defaultDomains;
    }
    return [];
  }

  return (
    <MsalProvider instance={msalInstance}>
      <Card>
        <Form id="bSDD_form">
          <Card.Body>
            {/* <Card.Title as="h4">bSDD search</Card.Title> */}
            <input type="hidden" name="ifcType" id="ifcType" value="" />
            <input type="hidden" name="name" id="name" value="" />
            <input type="hidden" name="material" id="material" value="" />
            <Row className="mb-3">
              <Col xs={7}>
                <Search
                  api={api}
                  activeDomains={activeDomains}
                  setActiveClassificationUri={setActiveClassificationUri}
                  accessToken={accessToken}
                />
              </Col>
              <Col xs={4}>
                <SelectDomains
                  api={api}
                  activeDomains={activeDomains}
                  setActiveDomains={setActiveDomains}
                  setDomains={setDomains}
                  accessToken={accessToken}
                />
              </Col>
              <Col>
                <RecursiveMode recursiveMode={recursiveMode} setRecursiveMode={setRecursiveMode} />
                <Authentication setAccessToken={setAccessToken} />
              </Col>
            </Row>

            <div className="mb-3 row">
              <Accordion defaultActiveKey={['0', '1']} alwaysOpen>
                <Accordion.Item eventKey="0">
                  <Accordion.Header>Classifications</Accordion.Header>
                  <Accordion.Body>
                    <Classifications
                      api={api}
                      activeClassificationUri={activeClassificationUri}
                      classifications={classifications}
                      setClassifications={setClassifications}
                      domains={domains}
                      accessToken={accessToken}
                    />
                  </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="1">
                  <Accordion.Header>Propertysets</Accordion.Header>
                  <Accordion.Body>
                    <PropertySets
                      classifications={classifications}
                      propertySets={propertySets}
                      setPropertySets={setPropertySets}
                      recursiveMode={recursiveMode}
                    />
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>
            </div>
            <Form.Group className="mb-3 row">
              <Apply
                callback={callback}
                domains={domains}
                classifications={classifications}
                propertySets={propertySets}
              />
            </Form.Group>
          </Card.Body>
        </Form>
      </Card>
    </MsalProvider>
  );
}

export default BsddSearch;
