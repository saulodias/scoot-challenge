import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { TodoServerService } from './services/todo-server.service';
import { TodoListModule } from './todo-list/todo-list.module';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, BrowserAnimationsModule, AppRoutingModule, HttpClientModule, TodoListModule],
  providers: [TodoServerService],
  bootstrap: [AppComponent],
})
export class AppModule {}
