import _provinces from './provinces.json';
import _rawOrganizationSizes from './organizationSizes.json';
import _rawOrganizationTypes from './organizationTypes.json';
import _rawPersonalPositions from './personalPositions.json';

const createArray = (map) => {
  return Object.keys(map).map((key) => ({
    value: key,
    label: map[key],
  }));
};

const createArrayFromProvinces = (provinces) => {
  return provinces.map((province) => ({
    value: province.statistical_code,
    label: province.name,
    children: province.cities.map((city) => ({
      value: city.statistical_code,
      label: city.name,
    })),
  }));
};

export const organizationSizes = createArray(_rawOrganizationSizes);
export const organizationTypes = createArray(_rawOrganizationTypes);
export const personalPositions = createArray(_rawPersonalPositions);
export const provinces = createArrayFromProvinces(_provinces);
