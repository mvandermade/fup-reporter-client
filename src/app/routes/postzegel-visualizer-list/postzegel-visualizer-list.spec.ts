import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostzegelVisualizerList } from './postzegel-visualizer-list';

describe('PostzegelVisualizerList', () => {
  let component: PostzegelVisualizerList;
  let fixture: ComponentFixture<PostzegelVisualizerList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PostzegelVisualizerList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PostzegelVisualizerList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
