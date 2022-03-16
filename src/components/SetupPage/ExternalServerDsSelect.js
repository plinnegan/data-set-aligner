import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { useAlert, useConfig, useDataEngine } from '@dhis2/app-runtime'
import { formatParams, savePat } from '../../utils/apiUtils'
import {
  MultiSelectField,
  MultiSelectOption,
  InputField,
  Button,
} from '@dhis2/ui'

const ExternalServerDsSelect = ({
  selectedDs,
  setSelectedDs,
  config,
  setConfig,
}) => {
  const { baseUrl } = useConfig()
  const { baseUrl: targetUrl } = config
  console.log('targetUrl: ', targetUrl)
  const [paToken, setPaToken] = useState(
    'd2pat_TxMOWxILdLLMGehs1CYBr0suDi3S3zNL1317041250'
  )
  const engine = useDataEngine()
  const [dsOptions, setDsOptions] = useState(null)
  const { show } = useAlert(`Error connecting to ${targetUrl}`, {
    critical: true,
  })

  const connect = async () => {
    const params = { fields: 'id,displayName~rename(name)', paging: 'false' }
    try {
      const req = await fetch(
        `${targetUrl}/api/dataSets?${formatParams(params)}`,
        {
          method: 'GET',
          headers: {
            Authorization: `ApiToken ${paToken}`,
          },
        }
      )
      const res = await req.json()
      if ('dataSets' in res) {
        setDsOptions(res.dataSets)
        savePat(engine, { baseUrl, targetUrl }, paToken)
        setPaToken(null)
      } else {
        show()
      }
    } catch (e) {
      show()
    }
  }

  if (dsOptions) {
    return (
      <MultiSelectField
        label="Select data sets"
        onChange={(e) => setSelectedDs(e.selected)}
        selected={selectedDs}
      >
        {dsOptions.map(({ id, name }) => (
          <MultiSelectOption label={name} key={id} value={id} />
        ))}
      </MultiSelectField>
    )
  }

  return (
    <div className="externalConnect">
      <InputField
        label="External server url"
        value={targetUrl}
        onChange={(e) => setConfig({ ...config, baseUrl: e.value })}
      />
      <InputField
        label="Personal access token (not password)"
        value={paToken}
        onChange={(e) => setPaToken(e.value)}
      />
      <Button primary onClick={connect}>
        Connect
      </Button>
    </div>
  )
}

ExternalServerDsSelect.propTypes = {
  selectedDs: PropTypes.arrayOf(PropTypes.string).isRequired,
  setSelectedDs: PropTypes.func.isRequired,
  config: PropTypes.shape({
    dsLocation: PropTypes.string.isRequired,
    baseUrl: PropTypes.string,
  }).isRequired,
  setConfig: PropTypes.func.isRequired,
}

export default ExternalServerDsSelect
