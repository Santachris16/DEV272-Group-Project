Week 07 – Sprint Closeout

**Team:** Proof of Concept  
**Project:** Bitespin – Random Restaurant Recommendation App  
**Sprint Duration:** Week 7

---

Completed Tasks

| Task Name                        | Creator            | Assignee             |
|----------------------------------|---------------------|-----------------------|
| Set up dynamic route navigation | Christian           | Christian             |
| Favorites screen functionality  | Christian/Chris     | Christian/Chris       |
| Initial UI for detail view      | Chris               | Chris                 |
| Debug TS + React Native types   | Chris               | Chris                 |
| Finalized routing layout        | Christian/Chris     | Christian/Chris       |

---

Unfinished Tasks 

| Task Name                      | Creator  | Assignee | Notes                                                                 |
|-------------------------------|----------|----------|-----------------------------------------------------------------------|
| SupaBase data integration     | Christian/Chris    | Christian/Chris     | Deferred to next sprint.              |

| Validation for Add/Edit forms | Christian/Chris     | Christian/Chris   | Formik planned 
but not yet implemented. UI ready, logic pending.     |

| Tab bar styling polish /Search bar       | Team     | Team     | Functioning but lacks final design pass. Pushed to next sprint.      |

---

## Bugs or Blockers

| Bug Name                           | Creator    | Assignee  | Notes                                                                 |
|------------------------------------|------------|-----------|-----------------------------------------------------------------------|
| `Cannot find module 'undefined'`  | Christian  | Christian | Caused by missing `expo.router.appRoot` setting. Fixed in package.json. |
| TypeScript can't find `react-native` | Christian    | Christian     | Resolved by installing `@types/react-native` manually.         |

---

## Key Wins

- Routing now fully functional with dynamic parameters.
-  Project structure cleaned, now runs with no nesting issues.
-  Learned how to properly configure Expo Router and TypeScript in a real-world setup.

---

## -Challenges

- Spent extra time troubleshooting Expo Router's dynamic routing and environment variables.
- Had to fix missing dependencies manually


---

##  Next Sprint Priorities

1. Finalize Supabase integration and test full CRUD flow
2. add search functuality 
3. Implement validation in Add/Edit forms
4. Polish tab bar and apply consistent UI theme across screens
5. Add loading indicators and error states
6. Begin documentation for demo presentation

---

