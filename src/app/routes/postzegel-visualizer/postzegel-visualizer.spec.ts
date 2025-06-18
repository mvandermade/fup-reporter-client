import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostzegelVisualizer } from './postzegel-visualizer';

describe('PostzegelVisualizer', () => {
  let component: PostzegelVisualizer;
  let fixture: ComponentFixture<PostzegelVisualizer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PostzegelVisualizer]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PostzegelVisualizer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
