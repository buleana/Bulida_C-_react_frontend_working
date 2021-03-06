import { useState } from 'react';
import styled from 'styled-components';
import { CampaignType, AdType } from 'src/utils/types';
import { SkagAdCreatorTableControllers } from 'src/components/skag/AdCreator/Table/SkagAdCreatorTableControllers';
import { SkagAdCreatorTable } from './Table/SkagAdCreatorTable';

type Props = {
  campaign: CampaignType;
};

export const SkagAdCreator = ({ campaign }: Props) => {
  const [selectedAdType, setSelectedAdType] = useState<AdType>(AdType.ALL);
  const { adGroupList } = campaign;
  const [selectedAdGroup, setSelectedAdGroup] = useState<string>(
    adGroupList[0].adGroup
  );
  const adsCount = adGroupList.reduce((acc, el) => {
    const { callOnlyExt, callOutExt, expTextAdExt, searchExt, snippetExt } = el;
    return (
      acc +
      callOnlyExt.length +
      callOutExt.length +
      expTextAdExt.length +
      searchExt.length +
      snippetExt.length
    );
  }, 0);

  const onSelectAdType = (result) => {
    const { value } = result;
    setSelectedAdType(value);
  };

  const onSelectAdGroup = (result) => {
    const { value } = result;
    setSelectedAdGroup(value);
  };

  return (
    <Container>
      <Title>
        <Bold>Ad</Bold> Creator
      </Title>
      <SkagAdCreatorTableControllers
        adsCount={adsCount}
        adGroupList={adGroupList}
        selectedAdType={selectedAdType}
        selectedAdGroup={selectedAdGroup}
        onSelectAdType={onSelectAdType}
        onSelectAdGroup={onSelectAdGroup}
      />
      <SkagAdCreatorTable
        adsCount={adsCount}
        adGroupList={adGroupList}
        selectedAdType={selectedAdType}
        selectedAdGroup={selectedAdGroup}
      />
    </Container>
  );
};

const Container = styled.div`
  width: -webkit-fill-available;
  padding: 0 12rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Title = styled.div`
  margin-bottom: 2.4rem;
  ${(props) => props.theme.text.fontType.h1};
`;

const Bold = styled.span`
  font-weight: bold;
`;
