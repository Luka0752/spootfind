import subprocess, os

os.chdir(r"C:\EcoCycle\spootfind")

git = r"C:\Program Files\Git\cmd\git.exe"

cmds = [
    [git, "add", "public/products/"],
    [git, "commit", "-m", "Add missing product images: bamboo-paper-towels, collapsible-cup, silicone-bags, etc."],
    [git, "push", "origin", "master"],
]

for cmd in cmds:
    result = subprocess.run(cmd, capture_output=True, text=True)
    print(f"--- {cmd[1]} ---")
    print(result.stdout[:500] if result.stdout else "(no stdout)")
    if result.stderr:
        print(result.stderr[:500])
    if result.returncode != 0:
        print(f"EXIT: {result.returncode}")
        break