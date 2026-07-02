import os

files_to_update = [
    r'src\pages\MissionSequence.jsx',
    r'src\pages\MissionEquipment.jsx',
    r'src\pages\Dashboard.jsx',
    r'src\pages\QuizPhase.jsx'
]

replacements = {
    'text-[#1e3a8a]': 'text-rose-900',
    'bg-blue-50 ': 'bg-rose-50 ',
    'bg-blue-50"': 'bg-rose-50"',
    'bg-blue-50\'': 'bg-rose-50\'',
    'bg-blue-100': 'bg-rose-100',
    'border-blue-50 ': 'border-rose-50 ',
    'border-blue-50"': 'border-rose-50"',
    'border-blue-50\'': 'border-rose-50\'',
    'border-blue-50}': 'border-rose-50}',
    'border-blue-100': 'border-rose-100',
    'border-blue-200': 'border-rose-200',
    'border-blue-300': 'border-rose-300',
    'border-blue-400': 'border-[#FB8682]',
    'border-blue-500': 'border-[#FB8682]',
    'text-blue-500': 'text-[#FB8682]',
    'bg-blue-500': 'bg-[#FB8682]',
    'hover:bg-blue-600': 'hover:bg-[#f4605b]',
    'hover:bg-blue-50': 'hover:bg-rose-50',
    'text-[#3b82f6]': 'text-[#FB8682]',
    'border-t-[#3b82f6]': 'border-t-[#FB8682]',
    'from-[#4A90E2]': 'from-[#FB8682]',
    'to-[#3b82f6]': 'to-[#f4605b]',
    'text-blue-700': 'text-rose-700',
    'hover:border-blue-300': 'hover:border-rose-300',
}

for file_path in files_to_update:
    if os.path.exists(file_path):
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
        
        for old, new in replacements.items():
            content = content.replace(old, new)
            
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"Updated {file_path}")
    else:
        print(f"File not found: {file_path}")
