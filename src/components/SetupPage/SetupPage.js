import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { useDataEngine } from '@dhis2/app-runtime'
import DsSelect from './DsSelect'
import { Button } from '@dhis2/ui'
import { IconArrowRight24 } from '@dhis2/ui-icons'
import './SetupPage.css'
import { getDsData } from '../../utils/apiUtils'

const SetupPage = ({ setSourceDs, setTargetDs }) => {
  const initConfig = { dsLocation: null, baseUrl: null }
  const [sourceDsIds, setSourceDsIds] = useState([])
  const [sourceConfig, setSourceConfig] = useState({ ...initConfig })
  const [targetDsIds, setTargetDsIds] = useState([])
  const [targetConfig, setTargetConfig] = useState({ ...initConfig })
  const [loadingDs, setLoadingDs] = useState(false)
  const disableContinue = sourceDsIds.length < 1 || targetDsIds.length < 1
  const engine = useDataEngine()

  const getDataSets = async () => {
    setLoadingDs(true)
    const sourceDs = await getDsData(engine, sourceDsIds, sourceConfig)
    const targetDs = await getDsData(engine, targetDsIds, targetConfig)
    setSourceDs(sourceDs)
    setTargetDs(targetDs)
  }

  return (
    <div className="setupPage">
      <div className="dsSelectSetup">
        <DsSelect
          selectedDs={sourceDsIds}
          setSelectedDs={setSourceDsIds}
          config={sourceConfig}
          setConfig={setSourceConfig}
          type="source"
        />
        <IconArrowRight24 />
        <DsSelect
          selectedDs={targetDsIds}
          setSelectedDs={setTargetDsIds}
          config={targetConfig}
          setConfig={setTargetConfig}
          type="target"
        />
      </div>

      <div className="configBtnWrapper">
        <Button
          onClick={getDataSets}
          disabled={disableContinue}
          className="configMap"
          primary
          loading={loadingDs}
        >
          Configure mapping
        </Button>
      </div>
    </div>
  )
}

SetupPage.propTypes = {
  setSourceDs: PropTypes.func.isRequired,
  setTargetDs: PropTypes.func.isRequired,
}

export default SetupPage