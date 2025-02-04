import React from 'react';
import { environmentSelectorStackStyle, environmentSelectorLabelStyle } from './Configuration.styles';
import { useTranslation } from 'react-i18next';
import { Stack, Label, IDropdownOption } from '@fluentui/react';
import { fileSelectorDropdownStyle } from '../../app/functions/function/function-editor/FunctionEditor.styles';
import { ArmObj } from '../../../models/arm-obj';
import { Environment } from '../../../models/static-site/environment';
import ConfigurationData from './Configuration.data';
import DropdownNoFormik from '../../../components/form-controls/DropDownnoFormik';

interface ConfigurationEnvironmentSelectorProps {
  environments: ArmObj<Environment>[];
  disabled: boolean;
  onDropdownChange: (environment: ArmObj<Environment>) => void;
  selectedEnvironment?: ArmObj<Environment>;
  isLoading: boolean;
}

const ConfigurationEnvironmentSelector: React.FC<ConfigurationEnvironmentSelectorProps> = props => {
  const { environments, onDropdownChange, disabled, selectedEnvironment, isLoading } = props;

  const { t } = useTranslation();

  const dropdownOptions: IDropdownOption[] = environments.map(environment => {
    return {
      key: environment.properties.buildId,
      text: ConfigurationData.getEnvironmentName(environment),
      isSelected: false,
      data: environment,
    };
  });

  const onChange = (e: unknown, option: IDropdownOption) => {
    onDropdownChange(option.data as ArmObj<Environment>);
  };

  return (
    <Stack horizontal className={environmentSelectorStackStyle()}>
      <Label className={environmentSelectorLabelStyle}>{t('staticSite_environment')}</Label>
      <DropdownNoFormik
        id="configuration-environment-selector"
        selectedKey={!!selectedEnvironment ? selectedEnvironment.properties.buildId : ''}
        options={dropdownOptions}
        onChange={onChange}
        ariaLabel={t('staticSite_environmentDropdownAriaLabel')}
        disabled={disabled}
        styles={fileSelectorDropdownStyle()}
        isLoading={isLoading}
      />
    </Stack>
  );
};

export default ConfigurationEnvironmentSelector;
