import {defineConfig} from 'sanity'
import {deskTool} from 'sanity/desk'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemas'
import { vercelDeployTool } from 'sanity-plugin-vercel-deploy'


export default defineConfig({
  name: 'default',
  title: 'Sanity',

  projectId: 'v57kmf2n',
  dataset: 'production',

  plugins: [deskTool(), visionTool(), vercelDeployTool(),],

  schema: {
    types: schemaTypes,
  },
})
