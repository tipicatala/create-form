import React, { useMemo } from 'react'

import s from './Result.module.scss' 

import { MAIN_FIELDS, SUB_FIELDS } from '../../constants'

interface Items {
  label: string,
  type: string,
}

interface Data {
  error: any,
  items: Items[] | undefined,
  title: string | undefined,
  buttons: string[] | undefined
}

interface ResultProps {
  config: string,
}

// {
// title: 'newForm',
// buttons: [ 'Cancel', 'Apply', 'Save'],
// items: [
//  { label: 'count', type: 'number' },
//  { label: 'isEditable', type: 'checkbox' },
//  { label: 'Caption', type: 'textfield' },
//  { label: 'Description', type: 'textarea' },
//  { label: 'Data', type: 'date' },
//  { label: 'Select', type: 'radio' }
// ] }

function Result({ config }:ResultProps) {
  const data:Data = useMemo(() => {
    let configToJson = config.replaceAll("'",'"')
    let result

    [...MAIN_FIELDS, ...SUB_FIELDS].forEach(el => {
      configToJson = configToJson.replaceAll(el, `"${el}"`)
    })

    try {
      result = JSON.parse(configToJson)
    }
    catch(e:any) {
      result = { error: e }
    }

    return result

  }, [config])

  return !data.error ? (
    <div className={s.root}>
      <div className={s.extraInfo}>
        acceptable fields are
        {MAIN_FIELDS.map(el => (
          <React.Fragment key={el}>
            {' '}
            <span>{el}</span>
            {' '}
          </React.Fragment>
        ))}
      </div>
      <div className={s.title}>{data.title}</div>
      <div className={s.inputs}>
        {data.items?.map((el) => (
          <div key={el.label} className={s.inputs_item}>
            <div className={s.label}>{el.label}</div>
            {el.type !== 'textarea' ? (<input type={el.type}/>) : (<textarea/>)}
          </div>
        ))}
      </div>
      <div className={s.buttons}>
        {data.buttons?.map((el) => (
          <input key={el} type='button' className={s.buttons_item} value={el}/>
        ))}
      </div>
    </div>
  ): (<div>{data.error.message}</div>)
}

export default Result