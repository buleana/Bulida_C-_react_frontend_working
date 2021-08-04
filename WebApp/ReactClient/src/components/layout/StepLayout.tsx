import styled, { css } from 'styled-components';
import isNil from 'lodash/isNil';
import isEmpty from 'lodash/isEmpty';
import PrevIcon from 'src/images/general/prev-icon.svg';
import NextIcon from 'src/images/general/next-icon.svg';
import { StepLayoutItem } from 'src/components/layout/StepLayoutItem';

type Props = {
  children: React.ReactNode;
  currentStep: number;
  progressBarSteps: string[];
  setCurrentStep: (step: number) => void;
  finishBuilderFlow: () => void;
};

export const StepLayout = ({
  children,
  currentStep,
  progressBarSteps,
  setCurrentStep,
  finishBuilderFlow,
}: Props) => {
  const isFirstStep = currentStep === 1 && !isNil(currentStep);
  const showStepFooter = !isNil(currentStep) && !isEmpty(progressBarSteps);

  const onPrev = () => {
    if (isFirstStep) {
      finishBuilderFlow();
    }

    setCurrentStep(currentStep - 1);
  };

  const onNext = () => {
    setCurrentStep(currentStep + 1);
  };

  return (
    <>
      <StepHeader>
        {progressBarSteps.map((label, index) => {
          const isCurrent = currentStep === index;
          const isZeroStep = index === 0;
          const isLastStep = index === progressBarSteps.length - 1;
          return (
            <StepLayoutItem
              key={index}
              label={label}
              isCurrent={isCurrent}
              isZeroStep={isZeroStep}
              isLastStep={isLastStep}
            />
          );
        })}
      </StepHeader>
      <Children>{children}</Children>
      <StepFooter showStepFooter={showStepFooter}>
        <PrevStepButton onClick={onPrev}>
          BACK
          <PrevStepIconContainer>
            <PrevStepIcon src={PrevIcon} />
          </PrevStepIconContainer>
        </PrevStepButton>
        <NextStepButton onClick={onNext}>
          NEXT
          <NextStepIconContainer>
            <NextStepIcon src={NextIcon} />
          </NextStepIconContainer>
        </NextStepButton>
      </StepFooter>
    </>
  );
};

const Children = styled.div``;

const StepHeader = styled.div`
  display: flex;
  height: 4.8rem;
  padding: 5rem 13rem 20rem 13rem;
  margin-bottom: -8rem;
  background-color: ${(props) => props.theme.colors.pureWhite};
`;

const StepFooter = styled.div<{ showStepFooter: boolean }>`
  display: ${(props) => (props.showStepFooter ? 'flex' : 'none')};
  justify-content: center;
  flex-direction: space-between;
  width: 100%;
  position: absolute;
  bottom: 0;
  margin: 4rem 0;
`;

const StepButtonStyles = css`
  cursor: pointer;
  display: flex;
  align-items: center;
  border-radius: 2rem;
  padding: 1rem 1rem 1rem 4rem;
  ${(props) => props.theme.text.fontType.h6};

  &:hover {
    box-shadow: 0 0.5rem 1rem 0 rgba(33, 33, 36, 0.2);
  }
`;

const PrevStepButton = styled.button`
  margin-right: 22rem;
  color: ${(props) => props.theme.colors.blue2};
  background-color: ${(props) => props.theme.colors.white};
  border: 0.1rem solid ${(props) => props.theme.colors.stroke};
  ${StepButtonStyles}
`;

const PrevStepIconContainer = styled.div`
  display: flex;
  padding: 1.2rem 3.2rem;
  margin-left: 3rem;
  box-sizing: border-box;
  border-radius: 4rem;
  border: 0.2rem solid ${(props) => props.theme.colors.stroke};
`;

const PrevStepIcon = styled.img`
  width: 1rem;
  height: 2rem;
`;

const NextStepButton = styled.button`
  color: ${(props) => props.theme.colors.white};
  background-color: ${(props) => props.theme.colors.blue2};
  border: none;
  ${StepButtonStyles}
`;

const NextStepIconContainer = styled.div`
  display: flex;
  padding: 1.2rem 2.6rem;
  margin-left: 3rem;
  box-sizing: border-box;
  border-radius: 4rem;
  border: 0.2rem solid ${(props) => props.theme.colors.white};
`;

const NextStepIcon = styled.img`
  width: 2.2rem;
  height: 2rem;
`;