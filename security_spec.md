# Aegis Pulse Security Specification

## 1. Data Invariants
- Detections are immutable once created.
- TrackedSubjects must be associated with a valid creator.
- All IDs must follow the format `^[a-zA-Z0-9_\\-]+$`.
- All string fields have strict length limits.

## 2. The "Dirty Dozen" Payloads (Examples)
1. `{"id": "det-1", "cameraId": 1, "timestamp": "2026-10-20T17:11:00Z", "category": "vehicle", "extraField": "malicious"}` (Shadow update test)
2. `{"id": "det-1", "cameraId": "invalid", ...}` (Type validation test)
3. ... (and so on)
