import {
  IgrCalendar,
  IgrCheckboxBase,
  IgrCombo,
  IgrComboChangeEventArgs,
  IgrComponentBoolValueChangedEventArgs,
  IgrComponentDataValueChangedEventArgs,
  IgrComponentValueChangedEventArgs,
  IgrDropdown,
  IgrDropdownItemComponentEventArgs,
  IgrInput,
  IgrSelect,
  IgrSelectItem,
  IgrSwitch
} from '@infragistics/igniteui-react';
import { IgrCellTemplateContext, IgrColumn, IgrGrid, IgrGridModule } from '@infragistics/igniteui-react-grids';
import '@infragistics/igniteui-react-grids/grids';
import { useGetFriends, useGetPeople } from '../hooks/northwind-hooks';
import createClassTransformer from '../style-utils';
import styles from './master-view.module.css';

IgrGridModule.register();

export default function MasterView() {
  const classes = createClassTransformer(styles);
  const people = useGetPeople();
  const friends = useGetFriends();


  const textInputInlineEditorTemplate = (ctx: { dataContext: IgrCellTemplateContext }) => {
    return (
      <>
        <IgrInput type="text" value={ctx.dataContext.cell.editValue} change={(_s: IgrInput, e: IgrComponentValueChangedEventArgs) => ctx.dataContext.cell.editValue = e.detail}></IgrInput>
      </>
    );
  }

  const selectInlineEditorTemplate = (ctx: { dataContext: IgrCellTemplateContext }) => {
    return (
      <>
        <IgrSelect value={ctx.dataContext.cell.editValue} change={(_s: IgrDropdown, e: IgrDropdownItemComponentEventArgs) => ctx.dataContext.cell.editValue = e.detail.value}>
          {people!.map((item, i) => (
            <>
              <IgrSelectItem value={item.last_name} key={i}>

                {item.last_name}
              </IgrSelectItem>
            </>
          ))}
        </IgrSelect>
      </>
    )
  }

  const comboBodyTemplate = (e: { dataContext: IgrCellTemplateContext }) => {
    return (
      <>
        <IgrCombo data={friends} value={e.dataContext.cell.value} displayKey="first_name" valueKey="id"></IgrCombo>
      </>
    )
  }

  const comboInlineEditorTemplate = (ctx: { dataContext: IgrCellTemplateContext }) => {
    return (
      <>
        <IgrCombo data={friends}
          value={ctx.dataContext.cell.value}
          change={(_s: IgrCombo, e: IgrComboChangeEventArgs) => ctx.dataContext.cell.editValue = e.detail.newValue}
          displayKey="first_name"
          valueKey="id">
        </IgrCombo>
      </>
    )
  }

  const calendarInlineEditorTemplate = (ctx: { dataContext: IgrCellTemplateContext }) => {
    return (
      <>
        <IgrCalendar value={new Date(ctx.dataContext.cell.editValue)} change={(_s: IgrCalendar, e: IgrComponentDataValueChangedEventArgs) => ctx.dataContext.cell.editValue = e.detail}></IgrCalendar>
      </>
    )
  }

  const switchInlineEditorTemplate = (ctx: { dataContext: IgrCellTemplateContext }) => {
    return (
      <>
        <IgrSwitch checked={ctx.dataContext.cell.editValue} change={(_s: IgrCheckboxBase, e: IgrComponentBoolValueChangedEventArgs) => ctx.dataContext.cell.editValue = e.detail}></IgrSwitch>
      </>
    )
  }

  const numberInputInlineEditorTemplate = (ctx: { dataContext: IgrCellTemplateContext }) => {
    return (
      <>
        <IgrInput type="number" value={ctx.dataContext.cell.editValue} change={(_s: IgrInput, e: IgrComponentValueChangedEventArgs) => ctx.dataContext.cell.editValue = e.detail}></IgrInput>
      </>
    )
  }

  return (
    <>
      <div className={classes("column-layout master-view-container")}>
        <IgrGrid data={people} primaryKey="id" rowEditable="true" autoGenerate="false" className={classes("ig-typography ig-scrollbar grid")}>
          <IgrColumn field="first_name" dataType="string" inlineEditorTemplate={textInputInlineEditorTemplate}></IgrColumn>
          <IgrColumn field="last_name" dataType="string" inlineEditorTemplate={selectInlineEditorTemplate}></IgrColumn>
          <IgrColumn field="friends" bodyTemplate={comboBodyTemplate} inlineEditorTemplate={comboInlineEditorTemplate}></IgrColumn>
          <IgrColumn field="birthDay" dataType="date" inlineEditorTemplate={calendarInlineEditorTemplate}></IgrColumn>
          <IgrColumn field="hasFriends" inlineEditorTemplate={switchInlineEditorTemplate} dataType="boolean"></IgrColumn>
          <IgrColumn field="age" dataType="number" inlineEditorTemplate={numberInputInlineEditorTemplate}></IgrColumn>
        </IgrGrid>
      </div>
    </>
  );
}