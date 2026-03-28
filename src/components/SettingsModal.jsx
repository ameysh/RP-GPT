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
      <div className="large-modal">
        <div className="close-large-modal">
          <span>Settings</span>
          <div className='close-large-modal-actions'>
            <button className='settings-save-button' onClick={handleSave} disabled={isSaving}>{isSaving ? 'Saving...' : 'Save'}</button>
            <IconButton icon={IconButtonEnum.CLOSE} onClick={closeModal} />
          </div>
        </div>
        <div className='settings-group'>
          <h3 className='settings-group-title'>System Prompts</h3>
          <div className='settings-ollama'>
            <span>Select Roleplay Model: </span>
            <select value={ollamaModel} onChange={(e) => setOllamaModel(e.target.value)}>
              {
                ollamaModels.map(model => (
                  <option key={model.model} value={model.model}>{model.model}</option>
                ))
              }
            </select>
          </div>
          <textarea
            className='settings-system-instructions'
            rows={10}
            value={systemInstructions}
            onChange={(e) => setSystemInstructions(e.target.value)}
            placeholder='System Instructions'
          />
          <div className='settings-ollama'>
            <span>Select Summary Model: </span>
            <select value={summaryModel} onChange={(e) => setSummaryModel(e.target.value)}>
              {
                ollamaModels.map(model => (
                  <option key={model.model} value={model.model}>{model.model}</option>
                ))
              }
            </select>
          </div>
          <textarea
            className='settings-system-instructions'
            rows={10}
            value={summaryInstructions}
            onChange={(e) => setSummaryInstructions(e.target.value)}
            placeholder='Summary Instructions'
          />
        </div>
        <div className='settings-group'>
          <h3 className='settings-group-title'>Advanced Parameters</h3>
          <div className='settings-ollama'>
            <span>temperature: </span>
            <input
              type="number"
              value={options.temperature}
                onChange={(e) => updateNumericOption('temperature', e.target.value, true)}
            />
              <button className='settings-reset-option-button' onClick={() => resetOptionToDefault('temperature')} title='Reset to default value'>{'\u21BA'}</button>
          </div>
          <div className='settings-ollama'>
            <span>top-p: </span>
            <input
              type="number"
              value={options.top_p}
                onChange={(e) => updateNumericOption('top_p', e.target.value, true)}
            />
              <button className='settings-reset-option-button' onClick={() => resetOptionToDefault('top_p')} title='Reset to default value'>{'\u21BA'}</button>
          </div>
          <div className='settings-ollama'>
            <span>top-k: </span>
            <input
              type="number"
              value={options.top_k}
                onChange={(e) => updateNumericOption('top_k', e.target.value)}
            />
              <button className='settings-reset-option-button' onClick={() => resetOptionToDefault('top_k')} title='Reset to default value'>{'\u21BA'}</button>
          </div>
          <div className='settings-ollama'>
            <span>num_predict: </span>
            <input
              type="number"
              value={options.num_predict}
                onChange={(e) => updateNumericOption('num_predict', e.target.value)}
            />
              <button className='settings-reset-option-button' onClick={() => resetOptionToDefault('num_predict')} title='Reset to default value'>{'\u21BA'}</button>
          </div>
          <div className='settings-ollama'>
            <span>repeat_penalty: </span>
            <input
              type="number"
              value={options.repeat_penalty}
                onChange={(e) => updateNumericOption('repeat_penalty', e.target.value, true)}
            />
              <button className='settings-reset-option-button' onClick={() => resetOptionToDefault('repeat_penalty')} title='Reset to default value'>{'\u21BA'}</button>
          </div>
          <div className='settings-ollama'>
            <span>repeat_last_n: </span>
            <input
              type="number"
              value={options.repeat_last_n}
                onChange={(e) => updateNumericOption('repeat_last_n', e.target.value)}
            />
              <button className='settings-reset-option-button' onClick={() => resetOptionToDefault('repeat_last_n')} title='Reset to default value'>{'\u21BA'}</button>
          </div>
          <div className='settings-ollama'>
            <span>num_ctx: </span>
            <input
              type="number"
              value={options.num_ctx}
                onChange={(e) => updateNumericOption('num_ctx', e.target.value)}
            />
              <button className='settings-reset-option-button' onClick={() => resetOptionToDefault('num_ctx')} title='Reset to default value'>{'\u21BA'}</button>
          </div>
        </div>
      </div>
    </div>
  );
}
