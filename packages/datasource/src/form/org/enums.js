import _rawOrganizationTypes from './organization-types.json';
import _rawPersonalPositions from './personal-positions.json';
import _rawOrganizationSizes from './organization-sizes.json';
import _provinces from './provinces.json';

const createArrayFromObject = (map) => {
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

export const organizationTypes = createArrayFromObject(_rawOrganizationTypes);
export const personalPositions = createArrayFromObject(_rawPersonalPositions);
export const organizationSizes = createArrayFromObject(_rawOrganizationSizes);
export const provinces = createArrayFromProvinces(_provinces);
