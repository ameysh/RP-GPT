import { readFile, writeFile } from '../utils/fileHelpers.js';
import { FilePaths, ApiPaths } from '../utils/constants.js';
import { validSettings } from '../utils/validator.js';

export default function register(app) {
  app.get(ApiPaths.Api_Settings, async (req, res) => {
    try {
      const data = await readFile(FilePaths.FilePath_OllamaSettings);
      res.json({
        ok: true,
        message: 'Settings retrieved successfully',
        data: data,
      });
    } catch (err) {
      res.status(500).json({
        ok: false,
        message: 'Failed to retrieve settings',
        error: err.message,
      });
    }
  });

  app.post(ApiPaths.Api_Settings, async (req, res) => {
    if (!validSettings(req.body)) {
      return res.status(400).json({
        ok: false,
        message: 'Invalid settings payload',
      });
    }

    try {
      await writeFile(FilePaths.FilePath_OllamaSettings, req.body);
      res.json({ ok: true, message: 'Settings saved successfully' });
    } catch (err) {
      res.status(500).json({
        ok: false,
        message: 'Failed to save settings',
        error: err.message,
      });
    }
  });
}
