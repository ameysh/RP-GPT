import { IconButton } from './IconButton';
import { IconButtonEnum } from '../utils/enums';
import { useState } from 'react';

// Baseline values used by each advanced-parameter reset button.
// These may be exported for use in other components, such as a "Reset All to Default" button in the future.
const DEFAULT_OPTIONS = {
  temperature: 0.82,
  top_p: 0.92,
  num_predict: 512,
  repeat_penalty: 1.12,
  num_ctx: 12288,
  top_k: 39,
  repeat_last_n: 8192,
};

const ADVANCED_PARAMETERS = [
  { key: 'temperature', label: 'Temperature', isFloat: true, step: 0.01 },
  { key: 'top_p', label: 'Top-p', isFloat: true, step: 0.01 },
  { key: 'top_k', label: 'Top-k', isFloat: false, step: 1 },
  { key: 'num_predict', label: 'Num predict', isFloat: false, step: 1 },
  { key: 'repeat_penalty', label: 'Repeat penalty', isFloat: true, step: 0.01 },
  { key: 'repeat_last_n', label: 'Repeat last n', isFloat: false, step: 1 },
  { key: 'num_ctx', label: 'Num ctx', isFloat: false, step: 1 },
];

export default function SettingsModal({ settings, saveSettings, ollamaModels, closeModal}) {
  const [ollamaModel, setOllamaModel] = useState(settings.ollamaModel);
  const [summaryModel, setSummaryModel] = useState(settings.summaryModel);
  const [systemInstructions, setSystemInstructions] = useState(settings.systemInstructions);
  const [summaryInstructions, setSummaryInstructions] = useState(settings.summaryInstructions);
  const [options, setOptions] = useState(settings.options);
  const [isSaving, setIsSaving] = useState(false);

  const updateNumericOption = (key, rawValue, isFloat = false) => {
    const parsedValue = isFloat ? parseFloat(rawValue) : parseInt(rawValue, 10);
    if (!Number.isFinite(parsedValue)) {
      return;
    }
    setOptions({ ...options, [key]: parsedValue });
  };

  const resetOptionToDefault = (key) => {
    setOptions({ ...options, [key]: DEFAULT_OPTIONS[key] });
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await saveSettings({ ollamaModel, summaryModel, systemInstructions, summaryInstructions, options });
      closeModal();
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="large-modal settings-modal">
        <div className="close-large-modal">
          <span>Settings</span>
          <div className='close-large-modal-actions'>
            <button className='settings-save-button' onClick={handleSave} disabled={isSaving}>{isSaving ? 'Saving...' : 'Save'}</button>
            <IconButton icon={IconButtonEnum.CLOSE} onClick={closeModal} />
          </div>
        </div>
        <section className='settings-section'>
          <h3 className='settings-group-title'>System Prompt</h3>
          <div className='settings-field-row'>
            <label className='settings-label' htmlFor='settings-roleplay-model'>Roleplay model</label>
            <select
              id='settings-roleplay-model'
              className='settings-control'
              value={ollamaModel}
              onChange={(e) => setOllamaModel(e.target.value)}
            >
              {ollamaModels.map(model => (
                <option key={model.model} value={model.model}>{model.model}</option>
              ))}
            </select>
          </div>

          <div className='settings-field-block'>
            <textarea
              id='settings-system-instructions'
              className='settings-system-instructions'
              rows={8}
              value={systemInstructions}
              onChange={(e) => setSystemInstructions(e.target.value)}
              placeholder='System Instructions'
            />
          </div>
        </section>

        <section className='settings-section'>
          <h3 className='settings-group-title'>Summary Instructions</h3>
          <div className='settings-field-row'>
            <label className='settings-label' htmlFor='settings-summary-model'>Summary model</label>
            <select
              id='settings-summary-model'
              className='settings-control'
              value={summaryModel}
              onChange={(e) => setSummaryModel(e.target.value)}
            >
              {ollamaModels.map(model => (
                <option key={model.model} value={model.model}>{model.model}</option>
              ))}
            </select>
          </div>

          <div className='settings-field-block'>
            <textarea
              id='settings-summary-instructions'
              className='settings-system-instructions'
              rows={8}
              value={summaryInstructions}
              onChange={(e) => setSummaryInstructions(e.target.value)}
              placeholder='Summary Instructions'
            />
          </div>
        </section>

        <section className='settings-section'>
          <h3 className='settings-group-title'>Advanced Parameters</h3>
          <div className='settings-advanced-grid'>
            {ADVANCED_PARAMETERS.map((parameter) => (
              <div className='settings-field-row settings-field-row-compact' key={parameter.key}>
                <label className='settings-label' htmlFor={`settings-option-${parameter.key}`}>{parameter.label}</label>
                <div className='settings-control-with-action'>
                  <input
                    id={`settings-option-${parameter.key}`}
                    className='settings-control settings-control-number'
                    type='number'
                    step={parameter.step}
                    value={options[parameter.key]}
                    onChange={(e) => updateNumericOption(parameter.key, e.target.value, parameter.isFloat)}
                  />
                  <button
                    type='button'
                    className='settings-reset-option-button'
                    onClick={() => resetOptionToDefault(parameter.key)}
                    title='Reset to default value'
                    aria-label={`Reset ${parameter.label} to default value`}
                  >
                    {'\u21BA'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
