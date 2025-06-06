import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Button } from '../Button/Button';
import { Modal, type ModalProps } from './Modal';

// 아이콘 예시
const InfoIcon = () => (
  <svg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
    <circle cx='12' cy='12' r='10' stroke='currentColor' strokeWidth='2' />
    <path
      d='M12 16V12M12 8H12.01'
      stroke='currentColor'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
    />
  </svg>
);

const WarningIcon = () => (
  <svg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
    <path
      d='M10.29 3.86L1.82 18A2 2 0 003.54 21H20.46A2 2 0 0022.18 18L13.71 3.86A2 2 0 0010.29 3.86Z'
      stroke='currentColor'
      strokeWidth='2'
    />
    <path
      d='M12 9V13M12 17H12.01'
      stroke='currentColor'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
    />
  </svg>
);

const CheckIcon = () => (
  <svg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
    <path
      d='M22 11.08V12A10 10 0 1112 2A10 10 0 0122 11.08Z'
      stroke='currentColor'
      strokeWidth='2'
    />
    <path
      d='M9 11L12 14L22 4'
      stroke='currentColor'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
    />
  </svg>
);

// Modal을 제어하는 Wrapper 컴포넌트
const ModalWrapper = ({ children, ...modalProps }: any) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>모달 열기</Button>
      <Modal {...modalProps} isOpen={isOpen} onClose={() => setIsOpen(false)}>
        {children}
      </Modal>
    </>
  );
};

// ModalWrapper Props 타입 정의
interface ModalWrapperProps extends Omit<ModalProps, 'isOpen' | 'onClose'> {
  children: React.ReactNode;
}

const meta = {
  title: 'Components/Modal',
  component: ModalWrapper,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
## Modal 컴포넌트

사용자의 주의를 집중시키고 중요한 정보를 표시하거나 액션을 요구하는 오버레이 컴포넌트입니다.

### 설계 원칙
- **독립적 기능**: 완전한 모달 기능을 자체적으로 제공
- **접근성 우선**: 키보드 네비게이션 지원
- **유연한 확장**: 다양한 크기와 스타일 변형 지원
- **모바일 최적화**: 터치 친화적인 인터랙션

### 주요 기능
- 5가지 크기 옵션 (sm, md, lg, xl, full)
- 4가지 스타일 변형 (default, danger, success, warning)
- 배경 클릭/ESC 키로 닫기 지원
- 자동 포커스 관리 및 스크롤 방지

### 사용법
각 스토리는 "모달 열기" 버튼을 클릭하여 모달을 확인할 수 있습니다.
        `,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    title: {
      control: 'text',
      description: '모달 제목',
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg', 'xl', 'full'],
      description: '모달 크기',
    },
    variant: {
      control: { type: 'select' },
      options: ['default', 'danger', 'success', 'warning'],
      description: '모달 스타일 변형',
    },
    closeOnBackdropClick: {
      control: 'boolean',
      description: '배경 클릭시 닫기 여부',
    },
    closeOnEscape: {
      control: 'boolean',
      description: 'ESC 키로 닫기 여부',
    },
    showCloseButton: {
      control: 'boolean',
      description: '우상단 X 버튼 표시 여부',
    },
    hideActions: {
      control: 'boolean',
      description: '액션 버튼 영역 숨김 여부',
    },
    confirmText: {
      control: 'text',
      description: '확인 버튼 텍스트',
    },
    cancelText: {
      control: 'text',
      description: '취소 버튼 텍스트',
    },
    onConfirm: {
      action: 'confirmed',
      description: '확인 버튼 클릭 핸들러',
    },
    onCancel: {
      action: 'cancelled',
      description: '취소 버튼 클릭 핸들러',
    },
  },
} satisfies Meta<typeof ModalWrapper>;

export default meta;
type Story = StoryObj<typeof meta>;

// === 기본 스토리들 ===

export const Default: Story = {
  args: {
    title: '알림',
    confirmText: '확인',
    children: (
      <p className='text-body'>
        이것은 기본 모달입니다. 간단한 메시지나 알림을 표시할 때 사용합니다.
      </p>
    ),
  },
};

export const Confirmation: Story = {
  args: {
    title: '삭제 확인',
    variant: 'danger',
    confirmText: '삭제',
    cancelText: '취소',
    children: (
      <div className='space-y-4'>
        <div className='flex items-start gap-3'>
          <InfoIcon />
          <div>
            <p className='text-body font-medium mb-2'>정말로 삭제하시겠습니까?</p>
            <p className='text-caption'>
              삭제된 데이터는 복구할 수 없습니다. 신중하게 결정해 주세요.
            </p>
          </div>
        </div>
      </div>
    ),
  },
};

export const Success: Story = {
  args: {
    title: '입찰 완료',
    variant: 'success',
    confirmText: '확인',
    children: (
      <div className='text-center space-y-4'>
        <div className='flex justify-center text-[var(--color-alert)]'>
          <CheckIcon />
        </div>
        <div>
          <p className='text-body font-medium mb-2'>입찰이 성공적으로 완료되었습니다!</p>
          <p className='text-caption'>경매 결과는 이메일로 알려드리겠습니다.</p>
        </div>
      </div>
    ),
  },
};

export const Warning: Story = {
  args: {
    title: '경매 마감 임박',
    variant: 'warning',
    confirmText: '입찰하기',
    cancelText: '나중에',
    children: (
      <div className='space-y-4'>
        <div className='flex items-start gap-3'>
          <div className='text-[var(--color-warning)]'>
            <WarningIcon />
          </div>
          <div>
            <p className='text-body font-medium mb-2'>시간이 3분 남았습니다!</p>
            <p className='text-caption'>
              경매가 곧 마감됩니다. 지금 입찰하지 않으면 기회를 놓칠 수 있습니다.
            </p>
          </div>
        </div>
      </div>
    ),
  },
};

// === 크기별 스토리 ===

export const Sizes: Story = {
  render: () => (
    <div className='space-y-4'>
      <div className='grid grid-cols-2 gap-4'>
        <ModalWrapper size='sm' title='Small Modal' confirmText='확인'>
          <p className='text-body'>작은 크기의 모달입니다.</p>
        </ModalWrapper>

        <ModalWrapper size='md' title='Medium Modal' confirmText='확인'>
          <p className='text-body'>중간 크기의 모달입니다.</p>
        </ModalWrapper>

        <ModalWrapper size='lg' title='Large Modal' confirmText='확인'>
          <p className='text-body'>큰 크기의 모달입니다.</p>
        </ModalWrapper>

        <ModalWrapper size='xl' title='Extra Large Modal' confirmText='확인'>
          <p className='text-body'>매우 큰 크기의 모달입니다.</p>
        </ModalWrapper>
      </div>

      <ModalWrapper size='full' title='Full Screen Modal' confirmText='확인'>
        <div className='space-y-4'>
          <p className='text-body'>전체 화면 모달입니다.</p>
          <p className='text-caption'>
            모바일에서 복잡한 폼이나 많은 콘텐츠를 표시할 때 유용합니다.
          </p>
        </div>
      </ModalWrapper>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: '다양한 크기의 모달들입니다. 콘텐츠의 양과 중요도에 따라 적절한 크기를 선택하세요.',
      },
    },
  },
};

export const VerticalButtons: Story = {
  args: {
    title: '즐겨찾기하고 쿠폰 받기',
    buttonLayout: 'vertical',
    confirmText: '즐겨찾기하고 쿠폰 받기',
    cancelText: '취소',
    children: (
      <div className='text-center space-y-4'>
        <p className='text-body'>
          시조님의 상점을 즐겨찾기하면 쿠폰을 드려요! 지금 즐겨찾기하고 쿠폰을 받으시겠어요?
        </p>
      </div>
    ),
  },
  parameters: {
    docs: {
      description: {
        story: '버튼이 세로로 배치된 모달입니다. 주요 액션 버튼이 더 강조됩니다.',
      },
    },
  },
};

export const VerticalDanger: Story = {
  args: {
    title: '계정 삭제',
    variant: 'danger',
    buttonLayout: 'vertical',
    confirmText: '계정 영구 삭제',
    cancelText: '취소',
    children: (
      <div className='space-y-4'>
        <div className='flex items-start gap-3'>
          <div className='text-[var(--color-danger)]'>
            <WarningIcon />
          </div>
          <div>
            <p className='text-body font-medium mb-2'>정말로 계정을 삭제하시겠습니까?</p>
            <p className='text-caption'>
              이 작업은 되돌릴 수 없으며, 모든 데이터가 영구적으로 삭제됩니다.
            </p>
          </div>
        </div>
      </div>
    ),
  },
  parameters: {
    docs: {
      description: {
        story: '위험한 액션의 경우 세로 레이아웃으로 신중한 선택을 유도할 수 있습니다.',
      },
    },
  },
};

export const ButtonLayouts: Story = {
  render: () => (
    <div className='space-y-4'>
      <div>
        <h3 className='text-h3 mb-3'>가로 레이아웃 (기본)</h3>
        <ModalWrapper
          title='가로 버튼 레이아웃'
          buttonLayout='horizontal'
          confirmText='확인'
          cancelText='취소'
        >
          <p className='text-body'>버튼이 나란히 배치됩니다.</p>
        </ModalWrapper>
      </div>

      <div>
        <h3 className='text-h3 mb-3'>세로 레이아웃</h3>
        <ModalWrapper
          title='세로 버튼 레이아웃'
          buttonLayout='vertical'
          confirmText='확인'
          cancelText='취소'
        >
          <p className='text-body'>버튼이 세로로 배치되어 주요 액션이 강조됩니다.</p>
        </ModalWrapper>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: '가로와 세로 버튼 레이아웃을 비교해볼 수 있습니다.',
      },
    },
  },
};

// === 실제 사용 예시 ===

export const RealWorldExamples: Story = {
  render: () => (
    <div className='space-y-6'>
      <div>
        <h3 className='text-h3 mb-3'>로그아웃 확인</h3>
        <ModalWrapper
          title='로그아웃'
          variant='default'
          confirmText='로그아웃'
          cancelText='취소'
          onConfirm={() => console.log('로그아웃')}
          onCancel={() => console.log('로그아웃 취소')}
        >
          <p className='text-body'>정말로 로그아웃 하시겠습니까?</p>
        </ModalWrapper>
      </div>

      <div>
        <h3 className='text-h3 mb-3'>입찰 확인</h3>
        <ModalWrapper
          title='입찰 확인'
          variant='default'
          confirmText='입찰하기'
          cancelText='취소'
          onConfirm={() => console.log('입찰 진행')}
          onCancel={() => console.log('입찰 취소')}
        >
          <div className='space-y-3'>
            <div className='bg-[var(--color-background)] p-3 rounded-lg'>
              <p className='text-caption text-[var(--color-sub-body)] mb-1'>입찰 금액</p>
              <p className='text-h3 text-[var(--color-main)]'>50,000원</p>
            </div>
            <p className='text-caption text-[var(--color-sub-body)]'>
              입찰 후에는 취소할 수 없습니다.
            </p>
          </div>
        </ModalWrapper>
      </div>

      <div>
        <h3 className='text-h3 mb-3'>계정 삭제</h3>
        <ModalWrapper
          title='계정 삭제'
          variant='danger'
          confirmText='영구 삭제'
          cancelText='취소'
          onConfirm={() => console.log('계정 삭제')}
          onCancel={() => console.log('삭제 취소')}
        >
          <div className='space-y-4'>
            <div className='flex items-start gap-3'>
              <div className='text-[var(--color-danger)]'>
                <WarningIcon />
              </div>
              <div>
                <p className='text-body font-medium mb-2'>계정을 영구적으로 삭제하시겠습니까?</p>
                <p className='text-caption text-[var(--color-sub-body)]'>
                  이 작업은 되돌릴 수 없으며, 모든 데이터가 완전히 삭제됩니다.
                </p>
              </div>
            </div>
          </div>
        </ModalWrapper>
      </div>

      <div>
        <h3 className='text-h3 mb-3'>위치 권한 요청</h3>
        <ModalWrapper
          title='위치 권한이 필요합니다'
          variant='default'
          confirmText='권한 허용'
          cancelText='나중에'
          onConfirm={() => console.log('위치 권한 허용')}
          onCancel={() => console.log('권한 거부')}
        >
          <div className='space-y-4'>
            <div className='flex items-start gap-3'>
              <InfoIcon />
              <div>
                <p className='text-body mb-2'>
                  주변 경매 정보를 제공하기 위해 위치 권한이 필요합니다.
                </p>
                <ul className='text-caption text-[var(--color-sub-body)] space-y-1'>
                  <li>• 내 주변 경매 찾기</li>
                  <li>• 거리 기반 배송비 계산</li>
                  <li>• 지역별 인기 상품 추천</li>
                </ul>
              </div>
            </div>
          </div>
        </ModalWrapper>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: '실제 경매 앱에서 사용될 수 있는 모달 예시들입니다.',
      },
    },
  },
};

// === 복잡한 콘텐츠 예시 ===

export const ComplexContent: Story = {
  render: () => (
    <ModalWrapper
      title='상품 신고하기'
      size='lg'
      confirmText='신고하기'
      cancelText='취소'
      onConfirm={() => console.log('신고 접수')}
      onCancel={() => console.log('신고 취소')}
    >
      <div className='space-y-4'>
        <div>
          <label className='block text-body font-medium mb-2'>신고 사유를 선택해주세요</label>
          <div className='space-y-2'>
            {['허위 정보', '사기 의심', '부적절한 이미지', '금지된 상품', '기타'].map((reason) => (
              <label key={reason} className='flex items-center gap-2'>
                <input
                  type='radio'
                  name='report-reason'
                  value={reason}
                  className='text-[var(--color-main)]'
                />
                <span className='text-body'>{reason}</span>
              </label>
            ))}
          </div>
        </div>

        <div>
          <label className='block text-body font-medium mb-2'>상세 내용 (선택사항)</label>
          <textarea
            className='w-full p-3 border border-[var(--color-line)] rounded-lg resize-none'
            rows={3}
            placeholder='신고 사유에 대해 자세히 설명해주세요.'
          />
        </div>

        <div className='bg-[var(--color-background)] p-3 rounded-lg'>
          <p className='text-caption text-[var(--color-sub-body)]'>
            신고해주신 내용은 검토 후 24시간 내에 처리됩니다.
          </p>
        </div>
      </div>
    </ModalWrapper>
  ),
  parameters: {
    docs: {
      description: {
        story: '폼과 같은 복잡한 콘텐츠를 포함한 모달 예시입니다.',
      },
    },
  },
};

// === 인터랙티브 테스트 ===

export const Interactive: Story = {
  render: (args) => {
    const [result, setResult] = useState('');

    const handleConfirm = () => {
      setResult('확인 버튼이 클릭되었습니다!');
    };

    const handleCancel = () => {
      setResult('취소 버튼이 클릭되었습니다!');
    };

    return (
      <div className='space-y-4'>
        <ModalWrapper {...args} onConfirm={handleConfirm} onCancel={handleCancel} />

        {result && (
          <div className='p-4 bg-[var(--color-main-lightest)] rounded-lg'>
            <p className='text-body text-[var(--color-main-text)]'>결과: {result}</p>
          </div>
        )}
      </div>
    );
  },
  args: {
    title: '인터랙티브 테스트',
    confirmText: '확인',
    cancelText: '취소',
    children: <p className='text-body'>버튼을 클릭하여 모달의 동작을 테스트해보세요.</p>,
  },
  parameters: {
    docs: {
      description: {
        story: '실제로 상호작용해볼 수 있는 인터랙티브 모달입니다.',
      },
    },
  },
};
