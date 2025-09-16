'use client';

import { useState } from 'react';
import { User, Wallet, Settings, Star } from 'lucide-react';
import { useMiniKit } from '@coinbase/minikit';
import { Button } from './ui/Button';
import { Card } from './ui/Card';
import { TextInput } from './ui/TextInput';

export function ProfileSetup() {
  const { user } = useMiniKit();
  const [skills, setSkills] = useState<string[]>(['React', 'TypeScript', 'Next.js']);
  const [newSkill, setNewSkill] = useState('');
  const [bio, setBio] = useState('Full-stack developer with 5+ years of experience building modern web applications.');

  const addSkill = () => {
    if (newSkill.trim() && !skills.includes(newSkill.trim())) {
      setSkills([...skills, newSkill.trim()]);
      setNewSkill('');
    }
  };

  const removeSkill = (skillToRemove: string) => {
    setSkills(skills.filter(skill => skill !== skillToRemove));
  };

  return (
    <div className="space-y-6 py-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center mx-auto">
          {user?.displayName ? (
            <span className="text-white text-2xl font-bold">
              {user.displayName.charAt(0).toUpperCase()}
            </span>
          ) : (
            <User className="w-8 h-8 text-white" />
          )}
        </div>
        <h2 className="text-2xl font-bold text-foreground">
          {user?.displayName || 'Your Profile'}
        </h2>
        <p className="text-muted">Manage your freelance profile</p>
      </div>

      {/* Profile Stats */}
      <div className="grid grid-cols-3 gap-4">
        <Card className="p-4 text-center">
          <div className="text-2xl font-bold text-primary">12</div>
          <div className="text-sm text-muted">Gigs Applied</div>
        </Card>
        <Card className="p-4 text-center">
          <div className="text-2xl font-bold text-accent">8</div>
          <div className="text-sm text-muted">Projects Done</div>
        </Card>
        <Card className="p-4 text-center">
          <div className="flex items-center justify-center space-x-1">
            <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
            <span className="text-2xl font-bold text-foreground">4.9</span>
          </div>
          <div className="text-sm text-muted">Rating</div>
        </Card>
      </div>

      {/* Bio Section */}
      <Card className="p-4 space-y-4">
        <h3 className="text-lg font-semibold text-foreground">Bio</h3>
        <textarea
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          className="w-full p-3 border border-muted/30 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
          rows={4}
          placeholder="Tell clients about yourself..."
        />
        <Button size="sm">Update Bio</Button>
      </Card>

      {/* Skills Section */}
      <Card className="p-4 space-y-4">
        <h3 className="text-lg font-semibold text-foreground">Skills</h3>
        
        <div className="flex flex-wrap gap-2">
          {skills.map((skill) => (
            <span
              key={skill}
              className="inline-flex items-center px-3 py-1 bg-primary/10 text-primary text-sm rounded-full"
            >
              {skill}
              <button
                onClick={() => removeSkill(skill)}
                className="ml-2 text-primary/60 hover:text-primary"
              >
                ×
              </button>
            </span>
          ))}
        </div>

        <div className="flex space-x-2">
          <TextInput
            value={newSkill}
            onChange={(e) => setNewSkill(e.target.value)}
            placeholder="Add a skill..."
            onKeyPress={(e) => e.key === 'Enter' && addSkill()}
          />
          <Button onClick={addSkill} size="sm">
            Add
          </Button>
        </div>
      </Card>

      {/* Wallet Section */}
      <Card className="p-4 space-y-4">
        <div className="flex items-center space-x-3">
          <Wallet className="w-5 h-5 text-primary" />
          <h3 className="text-lg font-semibold text-foreground">Wallet</h3>
        </div>
        
        {user ? (
          <div className="space-y-2">
            <p className="text-sm text-muted">Connected Wallet</p>
            <p className="font-mono text-sm bg-muted/10 p-2 rounded">
              {user.address || 'Not connected'}
            </p>
          </div>
        ) : (
          <div className="text-center py-4">
            <p className="text-muted mb-4">Connect your wallet to get started</p>
            <Button>Connect Wallet</Button>
          </div>
        )}
      </Card>

      {/* Settings */}
      <Card className="p-4 space-y-4">
        <div className="flex items-center space-x-3">
          <Settings className="w-5 h-5 text-primary" />
          <h3 className="text-lg font-semibold text-foreground">Settings</h3>
        </div>
        
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-foreground">Email Notifications</span>
            <input type="checkbox" defaultChecked className="rounded" />
          </div>
          <div className="flex items-center justify-between">
            <span className="text-foreground">Push Notifications</span>
            <input type="checkbox" defaultChecked className="rounded" />
          </div>
          <div className="flex items-center justify-between">
            <span className="text-foreground">Profile Visibility</span>
            <select className="border border-muted/30 rounded px-2 py-1 text-sm">
              <option>Public</option>
              <option>Private</option>
            </select>
          </div>
        </div>
      </Card>
    </div>
  );
}
