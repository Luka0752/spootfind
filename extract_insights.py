import json
import sys

try:
    with open('messages/en.json', 'r', encoding='utf-8') as f:
        data = json.load(f)
    
    insights = data.get('insights', {})
    
    # Write to temp file
    import tempfile
    with tempfile.NamedTemporaryFile(mode='w', encoding='utf-8', delete=False, suffix='.json') as f:
        json.dump(insights, f, ensure_ascii=False, indent=2)
        print(f"Written to: {f.name}")
except Exception as e:
    print(f"Error: {e}", file=sys.stderr)
    sys.exit(1)