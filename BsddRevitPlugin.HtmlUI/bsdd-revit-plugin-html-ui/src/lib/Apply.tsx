import { ClassificationContractV4, DomainContractV3 } from './BsddApi'

interface Props {
  callback: (value: any) => void
  domains: { [id: string]: DomainContractV3 }
  classifications: ClassificationContractV4[]
  propertySets: { [id: string]: IfcPropertySet }
}

function Apply(props: Props) {
  // const [selectOptions, setSelectOptions] = useState<any[]>([])

  function getIfcEntity(): IfcEntity {
    const ifc: IfcEntity = {}
    if (props.classifications.length) {
      ifc.hasAssociations = props.classifications.map((classification) => getIfcClassificationReference(classification))
    }
    const propertySets: IfcPropertySet[] = Object.values(props.propertySets)
    if (propertySets.length) {
      ifc.isDefinedBy = propertySets
    }
    return ifc
  }

  function getIfcClassification(domainNamespaceUri: string): IfcClassification | null {
    if (domainNamespaceUri in props.domains) {
      const domain: DomainContractV3 = props.domains[domainNamespaceUri]
      if (domain) {
        const ifc: IfcClassification = {
          type: 'IfcClassification',
          name: domain.name,
        }
        return ifc
      }
    }
    return null
  }

  function getIfcClassificationReference(bsdd: ClassificationContractV4): IfcClassificationReference {
    const ifc: IfcClassificationReference = {
      type: 'IfcClassificationReference',
      name: bsdd.name,
    }
    if (bsdd.namespaceUri) {
      ifc.location = bsdd.namespaceUri
    }
    if (bsdd.code) {
      ifc.identification = bsdd.code
    }
    if (bsdd.domainNamespaceUri) {
      const referencedSource = getIfcClassification(bsdd.domainNamespaceUri)
      if (referencedSource) {
        ifc.referencedSource = referencedSource
      }
    }
    return ifc
  }

  const handleOnChange = () => {
    props.callback(getIfcEntity())
  }

  return (
    <div>
      <button type='button' className='btn btn-secondary w-100' onClick={() => handleOnChange()}>
        Apply
      </button>
    </div>
  )
}

export default Apply
