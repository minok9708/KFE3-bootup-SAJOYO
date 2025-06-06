import React, { useCallback, useEffect } from 'react';
import { Button } from '../Button/Button';

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  onConfirm?: () => void;
  onCancel?: () => void;
  confirmText?: string;
  cancelText?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  variant?: 'default' | 'danger' | 'success' | 'warning';
  closeOnBackdropClick?: boolean;
  closeOnEscape?: boolean;
  showCloseButton?: boolean;
  hideActions?: boolean;
  ariaLabel?: string;
  ariaDescribedBy?: string;
  buttonLayout?: 'horizontal' | 'vertical';
  className?: string;
}

// X 닫기 아이콘 컴포넌트
const CloseIcon: React.FC = () => (
  <svg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
    <path
      d='M18 6L6 18M6 6L18 18'
      stroke='currentColor'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
    />
  </svg>
);

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  onConfirm,
  onCancel,
  confirmText = '확인',
  cancelText = '취소',
  size = 'md',
  variant = 'default',
  closeOnBackdropClick = true,
  closeOnEscape = true,
  showCloseButton = true,
  hideActions = false,
  buttonLayout = 'horizontal',
  ariaLabel,
  ariaDescribedBy,
  className = '',
  ...props
}) => {
  // ESC 키 이벤트 처리
  const handleEscape = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape' && closeOnEscape) {
        onClose();
      }
    },
    [closeOnEscape, onClose]
  );

  // 배경 클릭 처리
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget && closeOnBackdropClick) {
      onClose();
    }
  };

  // 확인 버튼 처리
  const handleConfirm = () => {
    if (onConfirm) {
      onConfirm();
    } else {
      onClose();
    }
  };

  // 취소 버튼 처리
  const handleCancel = () => {
    if (onCancel) {
      onCancel();
    } else {
      onClose();
    }
  };

  // 모달이 열릴 때 부수 효과 처리
  useEffect(() => {
    if (!isOpen) return;

    // body 스크롤 방지
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    // ESC 키 이벤트 리스너 등록
    if (closeOnEscape) {
      document.addEventListener('keydown', handleEscape);
    }

    // 첫 번째 focusable 요소에 포커스
    const modal = document.querySelector('[data-modal="true"]');
    if (modal) {
      const focusableElements = modal.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      const firstElement = focusableElements[0] as HTMLElement;
      if (firstElement) {
        firstElement.focus();
      }
    }

    // 클린업 함수
    return () => {
      document.body.style.overflow = originalOverflow;
      if (closeOnEscape) {
        document.removeEventListener('keydown', handleEscape);
      }
    };
  }, [isOpen, closeOnEscape, handleEscape]);

  // 모달이 닫혀있으면 렌더링하지 않음
  if (!isOpen) return null;

  // 크기별 스타일
  const sizeStyles = {
    sm: 'max-w-sm w-full mx-4',
    md: 'max-w-md w-full mx-4',
    lg: 'max-w-lg w-full mx-4',
    xl: 'max-w-xl w-full mx-4',
    full: 'w-full h-full m-0 rounded-none',
  };

  // 변형별 스타일
  const variantStyles = {
    default: {
      confirmButton: 'primary' as const,
      cancelButton: 'secondary' as const,
    },
    danger: {
      confirmButton: 'danger' as const,
      cancelButton: 'secondary' as const,
    },
    success: {
      confirmButton: 'primary' as const,
      cancelButton: 'secondary' as const,
    },
    warning: {
      confirmButton: 'primary' as const,
      cancelButton: 'secondary' as const,
    },
  };

  return (
    <div
      className='fixed inset-0 z-[var(--z-modal-backdrop)] overflow-y-auto'
      style={{ zIndex: 'var(--z-modal-backdrop)' }}
    >
      {/* 배경 오버레이 */}
      <div
        className='fixed inset-0 bg-[var(--modal-backdrop)] animate-fade-in'
        onClick={handleBackdropClick}
        aria-hidden='true'
      />

      {/* 모달 컨테이너 */}
      <div className='flex min-h-full items-center justify-center p-4'>
        <div
          data-modal='true'
          className={`
            relative bg-white rounded-[var(--modal-border-radius)]
            shadow-[var(--shadow-modal)]
            animate-scale-in
            ${sizeStyles[size]}
            ${className}
          `}
          role='dialog'
          aria-modal='true'
          aria-label={ariaLabel || title}
          aria-describedby={ariaDescribedBy}
          style={{ zIndex: 'var(--z-modal)' }}
          {...props}
        >
          {/* 헤더 영역 */}
          {(title || showCloseButton) && (
            <div className='flex items-center justify-between p-6 pb-4'>
              {title && <h2 className='text-h2 text-[var(--color-title)] pr-8'>{title}</h2>}

              {showCloseButton && (
                <button
                  onClick={onClose}
                  className='
                    absolute top-4 right-4
                    p-2 rounded-lg
                    text-[var(--color-sub-body)] 
                    hover:text-[var(--color-body)]
                    hover:bg-[var(--color-background)]
                    transition-colors duration-150
                    focus:outline-none focus:ring-2 
                    focus:ring-[var(--color-main)] focus:ring-offset-2
                  '
                  aria-label='모달 닫기'
                >
                  <CloseIcon />
                </button>
              )}
            </div>
          )}

          {/* 본문 영역 */}
          <div className={`px-6 ${title || showCloseButton ? 'pb-6' : 'py-6'}`}>{children}</div>

          {/* 액션 버튼 영역 */}
          {!hideActions && (onConfirm || onCancel) && (
            <div
              className={`px-6 pb-6 ${buttonLayout === 'vertical' ? 'space-y-3' : 'flex gap-3'}`}
            >
              {buttonLayout === 'vertical' ? (
                // 세로 레이아웃 (확인 버튼이 위에)
                <>
                  {onConfirm && (
                    <Button
                      variant={variantStyles[variant].confirmButton}
                      onClick={handleConfirm}
                      width='full'
                    >
                      {confirmText}
                    </Button>
                  )}

                  {onCancel && (
                    <Button
                      variant={variantStyles[variant].cancelButton}
                      onClick={handleCancel}
                      width='full'
                    >
                      {cancelText}
                    </Button>
                  )}
                </>
              ) : (
                // 가로 레이아웃 (기존 방식)
                <>
                  {onCancel && (
                    <Button
                      variant={variantStyles[variant].cancelButton}
                      onClick={handleCancel}
                      className='flex-1'
                    >
                      {cancelText}
                    </Button>
                  )}

                  {onConfirm && (
                    <Button
                      variant={variantStyles[variant].confirmButton}
                      onClick={handleConfirm}
                      className='flex-1'
                    >
                      {confirmText}
                    </Button>
                  )}
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Modal;
