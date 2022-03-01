import { useMemo } from 'react'
import cl from 'clsx'

import s from './Result.module.scss' 

interface Items {
  label: string,
  type: string,
}

interface Data {
  items: Items[],
}

interface ResultProps {
  config: string,
}

// { items: [
//  { label: 'count', type: 'number' },
//  { label: 'isEditable', type: 'checkbox' },
//  { label: 'Caption', type: 'textfield' },
//  { label: 'Description', type: 'textarea' },
//  { label: 'Data', type: 'date' },
//  { label: 'Select', type: 'radio' }
// ] }

function Result({ config }:ResultProps) {

  const data:Data = useMemo(() => {
    const configToJson = config
      .replaceAll('items', '"items"')
      .replaceAll('label', '"label"')
      .replaceAll('type', '"type"')
      .replaceAll("'",'"')

    const parsedJson = JSON.parse(configToJson)
    return parsedJson
  }, [config])

  
  return (
    <div className={s.root}>
      <div className={s.inputs}>
        {data.items.map((el) => (
          <div key={el.label} className={s.inputs_item}>
            <div className={s.label}>{el.label}</div>
            {el.type !== 'textarea' ? (<input type={el.type}/>) : (<textarea/>)}
          </div>
        ))}
      </div>
    </div>
  )
}

export default Result