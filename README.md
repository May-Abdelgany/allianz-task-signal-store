Interactive Box Selector — Angular SignalStore Implementation
Overview

This project implements the Interactive Box Selector Application using Angular Signals and NgRx SignalStore.

The application displays 10 interactive boxes where each box can be assigned an option from a shared option list. The selected options are persisted in localStorage, ensuring selections remain after refreshing the browser.

This implementation focuses on:

Angular Signals

NgRx SignalStore

Clean architecture

Separation of concerns

Minimal component state

The goal is to demonstrate a fully reactive Signal-based state management approach without using RxJS Observables.

Tech Stack

Angular (Latest Version)

NgRx SignalStore

Angular Signals

Standalone Components

OnPush Change Detection

Zoneless Change Detection

LocalStorage Persistence

Application Features

The application satisfies all functional requirements:

Displays 10 selectable boxes

Clicking a box opens an option selector

Selecting an option assigns it to the box

Automatically activates the next box

Previously selected options are preselected

Remove All Selections resets the state

Selections persist across browser refresh

State hydrates from localStorage on initialization

Architecture

The project follows feature-based architecture with strict separation of responsibilities.

src/app
│
├── core
│   └── services
│       └── localStorage
│           └── local-storage.service.ts
│
├── features
│   └── box-selector
│       │
│       ├── components
│       │   ├── box
│       │   ├── box-grid
│       │   ├── option-selector
│       │   └── total
│       │
│       ├── models
│       │   ├── box.ts
│       │   ├── salto.ts
│       │   ├── saltogroup.ts
│       │   └── storagestate.ts
│       │
│       ├── services
│       │   ├── box
│       │   │   └── box.service.ts
│       │   └── saltos
│       │       └── saltos.service.ts
│       │
│       └── store
│           └── storage
│               ├── storage.state.ts
│               ├── storage.store.ts
│               ├── storage.methods.ts
│               ├── storage.computed.ts
│               └── storage.hooks.ts
State Management (SignalStore)

All application state is centralized in a SignalStore.

storage.store.ts

The store uses:

Signals for state

Computed signals for derived values

Methods for state mutations

Hooks for lifecycle logic

State updates automatically trigger UI updates through Angular's reactive signal system.

Store Structure

The store is modularized into multiple files for clarity and maintainability.

storage.state.ts

Defines the initial state structure.

Example state:

{
  boxes: Box[],
  selectedBoxId: number | null,
  options: Salto[]
}
storage.methods.ts

Contains store mutation methods such as:

selecting a box

assigning an option

removing selections

activating the next box

storage.computed.ts

Defines derived state values, such as:

selected options

computed totals

active box state

storage.hooks.ts

Contains store lifecycle hooks, including:

state hydration from localStorage

persistence after state changes

Services Layer

Services encapsulate domain-specific logic and keep components lightweight.

BoxService

Responsible for:

box interactions

delegating actions to the store

SaltosService

Responsible for:

managing available options

providing option data to the store

LocalStorageService

Located in:

core/services/localStorage

Responsible for:

saving state to browser storage

retrieving stored state

isolating storage logic from the store

Components

The UI is composed of small, focused components.

BoxGridComponent

Displays the grid of 10 boxes.

BoxComponent

Represents a single selectable box.

Responsibilities:

display selected option

trigger box selection

OptionSelectorComponent

Displays the list of available options when a box is selected.

TotalComponent

Displays aggregated information based on selected options.

Angular Best Practices

The project follows modern Angular recommendations:

Standalone components

Signal inputs (input())

ChangeDetectionStrategy.OnPush

Zoneless change detection

New Angular template control flow

Example:

@if
@for
@switch
Persistence

State persistence is implemented using localStorage.

Whenever the state changes:

localStorage.setItem()

On application initialization:

Stored state is retrieved

Store is hydrated

UI renders with previous selections

Design Philosophy

The architecture aims to keep:

Components

simple

stateless

UI-focused

Store

single source of truth

reactive

predictable

Services

domain logic encapsulation

Running the Project

Install dependencies:

npm install --legacy-peer-deps

Run the project:

ng serve

Open in browser:

local : http://localhost:4200
production : https://allianz-task-signal-sto-git-f2403b-may-awaads-projects-7ca2c48a.vercel.app/
Notes

This project intentionally prioritizes:

architecture

state management

code readability

Visual styling is kept minimal, as the assessment focuses on technical implementation rather than UI design.
