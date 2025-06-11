import { CommonModule } from '@angular/common';
import {
  ChangeDetectorRef,
  Component,
  computed,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  OnDestroy,
  OnInit,
  Output,
  signal,
  ViewChild,
} from '@angular/core';

const DEFAULT_PRESS_DETECT_DURATION = 250;

@Component({
  selector: 'app-content-selector',
  template: `
    <span
      #containerRef
      role="button"
      tabindex="0"
      (click)="handleClick($event)"
      (mousedown)="handleMouseDown()"
      (mouseup)="handleMouseUp()"
      (mouseleave)="handleMouseUp()"
      (touchstart)="handleMouseDown()"
      (touchend)="handleMouseUp()"
      (touchcancel)="handleMouseUp()"
      (blur)="handleBlur()"
      (mouseenter)="onMouseEnter()"
      [ngStyle]="getContainerStyle()"
    >
      <ng-content></ng-content>
    </span>
  `,
  standalone: true,
  imports: [CommonModule],
})
export class ContentSelectorComponent implements OnInit, OnDestroy {
  @Input() onClickOutside?: () => void;
  @Input() pressDuration?: number;
  @Input() isSelecting?: boolean;

  @Output() click = new EventEmitter<MouseEvent>();
  @Output() press = new EventEmitter<void>();

  @ViewChild('containerRef', { static: true })
  containerRef!: ElementRef<HTMLSpanElement>;

  private isHovered = signal(false);
  private isSelectingState = signal(false);
  private pressTimerRef: ReturnType<typeof setTimeout> | null = null;

  private readonly isSelectingComputed = computed(
    () => this.isSelecting ?? this.isSelectingState()
  );

  private readonly isStringSlot = computed(() => {
    // In Angular, we can't easily detect if content is just text
    // This would need to be determined differently or simplified
    return true; // Simplified for now
  });

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.isSelectingState.set(this.isSelecting ?? false);
  }

  ngOnDestroy(): void {
    this.clearPressTimer();
  }

  @HostListener('document:mousedown', ['$event'])
  onDocumentMouseDown(event: MouseEvent): void {
    this.handleClickOutside(event);
  }

  private handleOnLongPress(): void {
    this.isSelectingState.set(true);
    this.press.emit();
  }

  private startPressTimer(): void {
    this.pressTimerRef = setTimeout(() => {
      this.handleOnLongPress();
    }, this.pressDuration ?? DEFAULT_PRESS_DETECT_DURATION);
  }

  private clearPressTimer(): void {
    if (this.pressTimerRef) {
      clearTimeout(this.pressTimerRef);
      this.pressTimerRef = null;
    }
  }

  handleMouseDown(): void {
    this.clearPressTimer();
    this.startPressTimer();
  }

  handleMouseUp(): void {
    this.isHovered.set(false);
    this.clearPressTimer();
  }

  private handleClickOutside(event: MouseEvent): void {
    if (
      this.containerRef?.nativeElement &&
      !this.containerRef.nativeElement.contains(event.target as Node)
    ) {
      this.isSelectingState.set(false);
      this.onClickOutside?.();
    }
  }

  handleClick(e: MouseEvent): void {
    if (this.isSelectingComputed()) {
      e.preventDefault();
      e.stopPropagation();
    }
    this.click.emit(e);
  }

  handleBlur(): void {
    this.isSelectingState.set(false);
  }

  onMouseEnter(): void {
    this.isHovered.set(true);
  }

  getContainerStyle(): { [key: string]: any } {
    return {
      display: this.isStringSlot() ? 'inline' : 'inline-block',
      cursor: 'pointer',
      userSelect: 'none',
      borderRadius: '0.375rem',
      outlineWidth: '2px',
      outlineOffset: '4px',
      outlineStyle: 'solid',
      outlineColor:
        this.isSelectingComputed() || this.isHovered()
          ? 'inherit'
          : 'transparent',
      transition: 'all 100ms 50ms ease-in-out',
    };
  }
}
